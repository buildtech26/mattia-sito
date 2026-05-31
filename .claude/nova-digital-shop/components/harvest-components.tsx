'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const WORDS = ['products', 'templates', 'presets', 'workflows', 'kits', 'brands']
const INTERVAL = 2200
const OUT_MS = 180
const IN_MS = 260

export function HeroRotatingWord() {
  const [word, setWord] = useState(WORDS[0])
  const [animClass, setAnimClass] = useState('')
  const i = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setInterval(() => {
      i.current = (i.current + 1) % WORDS.length
      if (reduced) {
        setWord(WORDS[i.current])
        return
      }
      setAnimClass('is-rotating-out')
      setTimeout(() => {
        setWord(WORDS[i.current])
        setAnimClass('is-rotating-in')
        setTimeout(() => setAnimClass(''), IN_MS)
      }, OUT_MS)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [])

  return <span className={`rotating-word ${animClass}`} translate="no">{word}</span>
}

export function StackedSlideshow() {
  const [active, setActive] = useState(0)
  const tabs = [
    {
      id: 'notion',
      label: 'Notion Templates',
      subheading: 'Organize your life and work',
      items: [
        { title: 'Dashboards', desc: 'Daily, weekly & monthly views in one place' },
        { title: 'Trackers', desc: 'Habits, goals, finances with stats and charts' },
        { title: 'Planners', desc: 'Content calendars, project boards, timelines' },
        { title: 'Journals', desc: 'Integrated journaling with gratitude prompts' },
      ],
    },
    {
      id: 'canva',
      label: 'Canva Templates',
      subheading: 'Your brand on social in one click',
      items: [
        { title: 'Social Posts', desc: '1080×1080 templates for Instagram, FB, LinkedIn' },
        { title: 'Stories & Reels', desc: '1080×1920 templates with animations' },
        { title: 'Brand Kits', desc: 'Logos, business cards, brand guidelines' },
        { title: 'Banners', desc: 'Covers for Facebook, LinkedIn, Twitter' },
      ],
    },
    {
      id: 'automations',
      label: 'Automations',
      subheading: 'Let Make do the repetitive work',
      items: [
        { title: 'Email Sequences', desc: 'Welcome, follow-up, re-engagement flows' },
        { title: 'Invoicing', desc: 'Auto-generate PDFs and track payments' },
        { title: 'Data Sync', desc: 'Connect Google Sheets, CRM, and more' },
        { title: 'Notifications', desc: 'Automated alerts and order confirmations' },
      ],
    },
    {
      id: 'lightroom',
      label: 'Lightroom Presets',
      subheading: 'Perfect mood for every shot',
      items: [
        { title: 'Portrait', desc: 'Flattering tones for people photography' },
        { title: 'Landscape', desc: 'Warm natural colors for travel and nature' },
        { title: 'Street', desc: 'Dark and cinematic urban looks' },
        { title: 'Food', desc: 'Still life presets with rich warmth' },
      ],
    },
  ]

  return (
    <section className="stacked-slideshow">
      <div className="content-wrapper">
        <h2 className="section-heading">Everything you need,<br />all in one marketplace</h2>

        <div className="ss-tabs" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              className={`ss-tab ${i === active ? 'is-active' : ''}`}
              role="tab"
              aria-selected={i === active}
              aria-controls={`ss-panel-${tab.id}`}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            id={`ss-panel-${tab.id}`}
            className={`ss-panel ${i === active ? 'is-active' : ''}`}
            role="tabpanel"
            aria-hidden={i !== active}
          >
            <div className="ss-panel-text">
              <p className="ss-panel-subheading">{tab.subheading}</p>
              <ul className="ss-panel-items">
                {tab.items.map((item) => (
                  <li key={item.title} className="ss-panel-item">
                    <span className="ss-panel-item-title">{item.title}</span>
                    <span className="ss-panel-item-desc">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ss-panel-media">
              <div style={{
                width: '100%',
                height: 300,
                background: 'linear-gradient(135deg, #fff8f1, #ffe8d6)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
              }}>
                {i === 0 ? '📓' : i === 1 ? '🎨' : i === 2 ? '⚡' : '📸'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TrustNumbers() {
  const ref = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || animated) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        if (!reduced) animateCounters(el)
        setAnimated(true)
        obs.unobserve(el)
      },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="trust-numbers" ref={ref}>
      <div className="trust-number-item">
        <p className="h5"><StatValue target={48} suffix="+" /></p>
        <p>digital products</p>
      </div>
      <div className="trust-number-item">
        <p className="h5"><StatValue target={150} suffix="+" /></p>
        <p>templates & presets</p>
      </div>
      <div className="trust-number-item">
        <p className="h5"><StatValue target={99.9} decimals={1} unit="percent" /></p>
        <p>customer satisfaction</p>
      </div>
      <div className="trust-number-item">
        <p className="h5"><StatValue target={100} suffix="%" /></p>
        <p>digital delivery</p>
      </div>
    </div>
  )
}

function StatValue({ target, suffix = '', decimals = 0, unit = 'plain' }: {
  target: number
  suffix?: string
  decimals?: number
  unit?: string
}) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const duration = 1400
    const start = performance.now()

    const step = (ts: number) => {
      const p = Math.min(1, (ts - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = target * eased

      if (unit === 'percent') {
        setValue(current)
      } else {
        setValue(current)
      }

      if (p < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [target, unit])

  const formatUnit = () => {
    if (unit === 'percent') return `${value.toFixed(decimals)}%`
    return `${Math.round(value).toString()}${suffix}`
  }

  return <>{formatUnit()}</>
}

function animateCounters(container: HTMLElement) {
  container.querySelectorAll('.stat-value-anim').forEach((el) => {
    // already handled by StatValue component
  })
}

export function TestimonialCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const [nextDisabled, setNextDisabled] = useState(false)

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      since: 'Customer since 2024',
      quote: 'The Notion templates saved me hours of setup. I went from zero to organized in one afternoon.',
      company: 'DesignStudio',
      industry: 'Creative',
      size: 'Solo',
    },
    {
      name: 'Marcus Johnson',
      role: 'Content Creator',
      since: 'Customer since 2024',
      quote: 'The Canva templates are gorgeous. My Instagram engagement went up 40% since I started using them.',
      company: 'ContentLab',
      industry: 'Social Media',
      size: '2 people',
    },
    {
      name: 'Elena Rossi',
      role: 'Small Business Owner',
      since: 'Customer since 2025',
      quote: 'The automation workflows transformed how I handle invoices. Hours of work reduced to minutes.',
      company: 'Rossi Boutique',
      industry: 'Retail',
      size: '5 people',
    },
    {
      name: 'David Kim',
      role: 'Photographer',
      since: 'Customer since 2024',
      quote: 'These Lightroom presets are incredible. My editing time dropped by half and my clients love the results.',
      company: 'Kim Photography',
      industry: 'Photography',
      size: 'Solo',
    },
  ]

  const updateState = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth - 1
    setPrevDisabled(el.scrollLeft <= 0)
    setNextDisabled(el.scrollLeft >= max)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    el.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    requestAnimationFrame(() => requestAnimationFrame(updateState))
    return () => {
      el.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [updateState])

  const scroll = (dir: 'prev' | 'next') => {
    const el = carouselRef.current
    if (!el) return
    const firstCard = el.querySelector('.testimonial-card') as HTMLElement
    if (!firstCard) return
    const step = firstCard.offsetWidth + 24
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <section className="testimonial-section">
      <div className="content-wrapper">
        <h2 className="section-heading">Loved by creators and<br />small businesses alike.</h2>

        <div className="testimonial-carousel" ref={carouselRef}>
          <div className="testimonial-track">
            {testimonials.map((t, i) => (
              <article key={i} className="testimonial-card">
                <div className="testimonial-meta">
                  <div className="company-logo">
                    <div style={{ height: 24, display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5 }}>
                      <span style={{ fontSize: 18 }}>{['🎨', '📱', '🏪', '📷'][i]}</span>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{t.company}</span>
                    </div>
                  </div>
                  <dl className="company-facts">
                    <div><dt>Industry</dt><dd>{t.industry}</dd></div>
                    <div><dt>Size</dt><dd>{t.size}</dd></div>
                  </dl>
                </div>
                <hr className="divider" />
                <blockquote className="quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <footer className="attribution">
                  <p className="name">{t.name}</p>
                  <p className="role">{t.role}</p>
                  <p className="since">{t.since}</p>
                </footer>
              </article>
            ))}
          </div>
        </div>

        <div className="carousel-arrows">
          <button type="button" className={`carousel-arrow prev ${prevDisabled ? 'is-disabled' : ''}`} aria-label="Previous testimonial" onClick={() => scroll('prev')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13.5 8 H2.5 M7 3.5 L2.5 8 L7 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <button type="button" className={`carousel-arrow next ${nextDisabled ? 'is-disabled' : ''}`} aria-label="Next testimonial" onClick={() => scroll('next')}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8 H13.5 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>

        <div className="onboarding-cta">
          <p>Building a brand?</p>
          <a href="/products" className="button-secondary">Browse all products</a>
        </div>
      </div>
    </section>
  )
}

export function MobileNavScript() {
  useEffect(() => {
    const toggle = document.querySelector('.rb-nav-mobile-toggle')
    const drawer = document.getElementById('rb-nav-mobile')
    if (!toggle || !drawer) return

    const handler = () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true'
      const next = !isOpen
      toggle.setAttribute('aria-expanded', String(next))
      toggle.setAttribute('aria-label', next ? 'Close menu' : 'Open menu')
      drawer.toggleAttribute('hidden', !next)
      document.body.classList.toggle('rb-nav-mobile-open', next)
      document.documentElement.classList.toggle('rb-nav-mobile-open', next)
    }
    toggle.addEventListener('click', handler)

    drawer.querySelectorAll('.rb-nav-mobile-trigger').forEach((btn) => {
      btn.addEventListener('click', function (this: HTMLElement) {
        const expanded = this.getAttribute('aria-expanded') === 'true'
        this.setAttribute('aria-expanded', String(!expanded))
        this.parentElement?.classList.toggle('rb-nav-mobile-item--open', !expanded)
      })
    })

    return () => toggle.removeEventListener('click', handler)
  }, [])

  return null
}

export function FooterNavScript() {
  useEffect(() => {
    const triggers = document.querySelectorAll('.footer-nav-trigger')
    triggers.forEach((btn) => {
      btn.addEventListener('click', function (this: HTMLElement) {
        const col = this.parentElement
        const expanded = this.getAttribute('aria-expanded') === 'true'
        this.setAttribute('aria-expanded', String(!expanded))
        col?.classList.toggle('footer-nav-col--open', !expanded)
      })
    })
  }, [])
  return null
}