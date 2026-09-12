'use client';
/* oxlint-disable jsx-a11y/media-has-caption -- Original creator videos and caption files are pending account access; this component never fabricates captions. */
/* oxlint-disable next/no-img-element -- Real Instagram covers retain explicit dimensions. */
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera as Instagram,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import Link from './site-link';
import { BrandMark, instagramUrl } from './brand';
import { reels, selectReels, type Reel } from './reel-data';

type InstagramWindow = Window & { instgrm?: { Embeds: { process(): void } } };
let embedScript: Promise<void> | undefined;
function loadEmbed() {
  if ((window as InstagramWindow).instgrm) return Promise.resolve();
  embedScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      embedScript = undefined;
      reject(new Error('Speler niet bereikbaar'));
    };
    document.head.appendChild(script);
  });
  return embedScript;
}
function OfficialPlayer({ reel }: { reel: Reel }) {
  const [state, setState] = useState('loading'),
    player = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let alive = true;
    const element = player.current;
    if (!element) return;
    const observer = new MutationObserver(() => {
      const iframe = element.querySelector('iframe');
      // Meta sets an explicit height after its embedded content is ready.
      if (
        iframe &&
        parseFloat(
          iframe.style.height || iframe.getAttribute('height') || '0',
        ) > 120 &&
        alive
      )
        setState('ready');
    });
    observer.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'height'],
    });
    const timer = setTimeout(() => {
      if (alive) setState((value) => (value === 'ready' ? value : 'error'));
    }, 15000);
    loadEmbed()
      .then(() => {
        if (alive) (window as InstagramWindow).instgrm?.Embeds.process();
      })
      .catch(() => {
        if (alive) setState('error');
      });
    return () => {
      alive = false;
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [reel.url]);
  return (
    <div className={'reel-official-player player-' + state} ref={player}>
      {state === 'loading' && (
        <output className="reel-loading">Instagram-speler laden…</output>
      )}
      {state === 'error' && (
        <div className="reel-embed-unavailable">
          <img src={reel.thumbnail} alt="" width={360} height={640} />
          <output>
            Instagram geeft hier geen afspeelbare video terug. Open het
            origineel hieronder. De eigen videospeler wordt beschikbaar zodra
            Daniels account is gekoppeld.
          </output>
        </div>
      )}
      <div className="reel-embed-frame" hidden={state === 'error'}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={reel.url}
          data-instgrm-version="14"
        >
          <a href={reel.url} target="_blank" rel="noreferrer">
            Bekijk de oorspronkelijke Reel
          </a>
        </blockquote>
      </div>
      {state === 'ready' && (
        <p className="reel-player-help">
          Tik op afspelen in de Instagram-speler.
        </p>
      )}
    </div>
  );
}

function ReelCard({
  reel,
  active,
  setActive,
  open,
}: {
  reel: Reel;
  active: string | null;
  setActive: (id: string | null) => void;
  open: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null),
    card = useRef<HTMLElement>(null);
  const [failed, setFailed] = useState(false),
    [playing, setPlaying] = useState(false),
    [muted, setMuted] = useState(true),
    [videoError, setVideoError] = useState(false);
  const playable = !!reel.videoUrl && !videoError;
  useEffect(() => {
    const v = video.current;
    if (active !== reel.id && v) {
      v.pause();
    }
  }, [active, reel.id]);
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.current?.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    const hidden = () => {
      if (document.hidden) video.current?.pause();
    };
    document.addEventListener('visibilitychange', hidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', hidden);
    };
  }, []);
  function play(sound = false) {
    const v = video.current;
    if (!v) return;
    setActive(reel.id);
    v.muted = !sound;
    setMuted(!sound);
    void v.play().catch(() => setPlaying(false));
  }
  function toggle() {
    if (!playable) {
      open();
      return;
    }
    if (playing) video.current?.pause();
    else play(true);
  }
  return (
    <article
      className="social-story reel-card"
      ref={card}
      onPointerEnter={(e) => {
        if (
          e.pointerType === 'mouse' &&
          playable &&
          !matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          play();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') video.current?.pause();
      }}
    >
      <div className="social-cover">
        {failed ? (
          <div className="social-fallback">
            <BrandMark />
          </div>
        ) : (
          <img
            src={reel.thumbnail}
            alt=""
            width={360}
            height={640}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
        {/* oxlint-disable-next-line jsx-a11y/media-has-caption -- Original creator media: caption files are not yet supplied; link to the original remains available. */}
        {playable && (
          <video
            ref={video}
            src={reel.videoUrl}
            poster={reel.thumbnail}
            preload="none"
            playsInline
            loop
            muted={muted}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setVideoError(true);
              setPlaying(false);
            }}
            aria-label={reel.title}
          />
        )}
        <button
          className={'reel-play-surface' + (playing ? ' is-playing' : '')}
          onClick={toggle}
          aria-label={
            (playing
              ? 'Pauzeer '
              : playable
                ? 'Speel af: '
                : 'Bekijk op deze website: ') + reel.title
          }
        >
          <span>
            {playing ? (
              <Pause size={25} />
            ) : (
              <Play size={25} fill="currentColor" />
            )}
          </span>
          <b>
            {playing
              ? 'Pauzeren'
              : playable
                ? 'Tik om af te spelen'
                : 'Bekijk hier'}
          </b>
        </button>
        {playable && playing && (
          <button
            className="reel-sound"
            aria-label={muted ? 'Geluid aan' : 'Geluid uit'}
            onClick={() => {
              if (video.current) {
                video.current.muted = !muted;
                setMuted(!muted);
              }
            }}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
      </div>
      <div className="social-caption">
        <time dateTime={reel.publishedAt}>
          {new Intl.DateTimeFormat('nl-NL', {
            day: 'numeric',
            month: 'short',
            timeZone: 'Europe/Amsterdam',
          }).format(new Date(reel.publishedAt))}
        </time>
        <h3>{reel.title}</h3>
        <Link
          href={reel.url}
          target="_blank"
          rel="noreferrer"
          className="reel-original"
        >
          Open op Instagram <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
export function ReelRail() {
  const [items, setItems] = useState(() => selectReels(reels)),
    [status, setStatus] = useState('waiting'),
    [active, setActive] = useState<string | null>(null),
    [opened, setOpened] = useState<Reel | null>(null),
    [position, setPosition] = useState({ start: true, end: false });
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let alive = true,
      controller: AbortController | undefined;
    const refresh = () => {
      if (document.hidden) return;
      controller?.abort();
      controller = new AbortController();
      fetch('/api/instagram/reels', { signal: controller.signal })
        .then((r) => {
          if (!r.ok) throw new Error();
          return r.json() as Promise<{ items: Reel[]; status: string }>;
        })
        .then((data) => {
          if (alive && Array.isArray(data.items)) {
            setItems(selectReels(data.items));
            setStatus(data.status);
          }
        })
        .catch(() => {});
    };
    refresh();
    const timer = setInterval(refresh, 15 * 60 * 1000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      alive = false;
      controller?.abort();
      clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () =>
      setPosition({
        start: el.scrollLeft < 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', update);
    };
  }, [items]);
  function move(d: number) {
    const el = rail.current;
    if (el)
      el.scrollBy({
        left: d * ((el.querySelector('article')?.clientWidth || 220) + 16),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
  }
  return (
    <section
      className="social-edition reels-player-edition"
      id="daniel-in-je-feed"
      aria-label="Beurswatcher op Instagram"
    >
      <div className="social-intro">
        <Instagram size={24} />
        <span className="eyebrow">DANIEL, IN JE FEED</span>
        <h2>
          Even kijken.
          <br />
          <em>Verder denken.</em>
        </h2>
        <p>
          Korte verhalen. Goede vragen. Bekijk de Reels hier en verdiep je
          daarna verder.
        </p>
        <p className="reel-interaction-help">
          {status === 'connected'
            ? 'Tik op een video om te kijken. Op je computer start een beschikbare voorvertoning zonder geluid bij aanwijzen.'
            : 'Tik op ‘Bekijk hier’ voor de Instagram-speler op deze website.'}
        </p>
        <Link href="/artikelen" className="textlink">
          Verder met de verdieping <ArrowRight size={18} />
        </Link>
        <div className="social-controls">
          <button
            onClick={() => move(-1)}
            disabled={position.start}
            aria-label="Vorige Reel"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => move(1)}
            disabled={position.end}
            aria-label="Volgende Reel"
          >
            <ArrowRight size={18} />
          </button>
          <span>SWIPE & ONTDEK</span>
        </div>
        <small className="reels-connection-status">
          {status === 'waiting'
            ? 'Automatische feed & voorvertoningen: wachten op Daniels Instagram-koppeling.'
            : status === 'unavailable'
              ? 'Koppeling tijdelijk niet bereikbaar. Je bekijkt de opgeslagen selectie.'
              : 'Automatisch opgehaald bij @beurswatcher. Voorvertoningen waar Instagram de video beschikbaar stelt.'}
        </small>
      </div>
      <div className="social-track" ref={rail}>
        {items.map((r) => (
          <ReelCard
            key={r.id}
            reel={r}
            active={active}
            setActive={setActive}
            open={() => {
              setActive(null);
              setOpened(r);
            }}
          />
        ))}
      </div>
      <Dialog
        open={!!opened}
        onOpenChange={(open) => {
          if (!open) setOpened(null);
        }}
      >
        <DialogContent className="reel-dialog" showCloseButton={false}>
          <DialogClose
            className="reel-dialog-close"
            aria-label="Speler sluiten"
          >
            <X size={20} />
          </DialogClose>
          <DialogTitle>{opened?.title}</DialogTitle>
          <DialogDescription>
            De officiële Instagram-speler. Je blijft op Beurswatcher.
          </DialogDescription>
          {opened && <OfficialPlayer key={opened.id} reel={opened} />}
          <Link
            href={opened?.url || instagramUrl}
            className="textlink"
            target="_blank"
            rel="noreferrer"
          >
            Open het origineel op Instagram <ArrowUpRight size={16} />
          </Link>
        </DialogContent>
      </Dialog>
    </section>
  );
}
