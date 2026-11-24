# CHRIST Incubation and Consultancy Foundation

## About Us

CHRIST Incubation and Consultancy Foundation (CICF) is the consultancy arm of CHRIST (Deemed to be University), established to bridge the gap between academic excellence and industry innovation. With over 5 years of cross-functional impact, we specialize in providing result-driven business solutions.

## Our Mission

To bridge academia and industry through research-driven solutions, fostering innovation and sustainable growth across public and private sector organizations.

## Services Offered

### Core Consulting Services

- **Business Solutions & Strategy**: Comprehensive business planning and strategic consulting
- **Digital Transformation**: Technology integration and digital innovation solutions
- **Education & Training**: Customized training programs and educational consulting
- **Research & Development**: Academic research collaboration and development projects
- **Sustainability Consulting**: Environmental and social sustainability solutions
- **Commercial Management**: Business operations and commercial strategy optimization

### Specialized Services

- **Legal Expertise**: Legal consulting and compliance advisory
- **Architectural Excellence**: Design and architectural consulting services
- **Hotel & Culinary Management**: Hospitality industry consulting
- **Performing Arts**: Creative industries and arts management consulting

## Client Sectors

- Government Organizations
- Private Sector Companies
- Educational Institutions
- Social Organizations
- Research Bodies
- Training & Development Firms

## Research Labs

Our research capabilities include:

- Innovation Labs
- Business Research Centers
- Technology Development Units
- Academic Research Facilities

## Contact Information

- **Email**: consultancy@christuniversity.in
- **Phone**: 080 4012 9958
- **Address**: CHRIST (Deemed to be University), Hosur Road, Bengaluru - 560029, India
- **Website**: https://consulting-microsite.vercel.app/

## Social Media

- **LinkedIn**: https://www.linkedin.com/company/christ-consulting
- **Instagram**: https://www.instagram.com/christ_consulting

## Our Team

Our multidisciplinary team consists of:

- Expert consultants with industry experience
- Research professionals and academic faculty
- Industry specialists across various domains
- Student researchers contributing to innovative projects

## Why Choose CHRIST Consulting?

1. **Academic Excellence**: Backed by CHRIST University's research capabilities
2. **Industry Experience**: Proven track record across multiple sectors
3. **Research-Driven Approach**: Evidence-based solutions and strategies
4. **Cross-Functional Expertise**: Diverse team with varied specializations
5. **Sustainable Solutions**: Focus on long-term, sustainable business growth

## Website Features

This website showcases:

- Comprehensive service portfolio
- Team profiles and expertise
- Client testimonials and case studies
- Research lab capabilities
- Event highlights and achievements
- Contact and consultation booking

## Admin Panel (contact form messages)

Messages submitted through the home page contact form are stored and listed at
`/admin/messages` (sign in at `/admin/login`). The admin pages are not linked
from the site and are marked `noindex`.

- **API:** Vercel serverless functions in `api/` (`/api/contact`, `/api/admin/*`).
  `npm run dev` serves them locally through a dev-only Vite plugin.
- **Storage:** MongoDB (CICF Atlas cluster). Each submission is saved to the
  `contact_submissions` collection (`name`, `email`, `message`, `submittedAt`
  as a date/time) and the admin page lists that same collection. Locally, when
  `MONGODB_URI` isn't set, submissions go to `.data/contact-submissions.json`
  (gitignored).
- **Auth:** one admin account configured through environment variables only;
  see `.env.example`.

### Local setup

1. `npm install`
2. `npm run hash-password` and enter a password (min. 12 characters).
3. Create `.env.local` (gitignored) with `ADMIN_USERNAME=admin` plus the
   `ADMIN_PASSWORD_HASH` and `SESSION_SECRET` lines the script printed.
   Add `MONGODB_URI=<connection string>` to use the Atlas cluster (your IP
   must be on the Atlas Network Access list).
4. `npm run dev`, submit the contact form on the home page, then sign in at
   `http://localhost:5173/admin/login`.

### Production (Vercel project settings)

Set `MONGODB_URI` (and optionally `MONGODB_DB`), `ADMIN_USERNAME`,
`ADMIN_PASSWORD_HASH` and `SESSION_SECRET` under Settings → Environment
Variables, then redeploy. In Atlas → Network Access, allow connections from
Vercel (Vercel functions have no fixed IPs, so this usually means
`0.0.0.0/0`, protected by the database user's password).

Email notifications for new messages are not implemented yet (pending IT
approval); see the `TODO(email-notifications)` in `api/contact.ts`.

---

_CHRIST Incubation and Consultancy Foundation - Bridging Academia and Industry Excellence_

© 2025 CHRIST Consulting. All rights reserved.
