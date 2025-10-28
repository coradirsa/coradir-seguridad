# Coradir Seguridad

Sitio web corporativo de Coradir Seguridad, empresa especializada en soluciones de seguridad integral para comunidades, con enfoque en botones antipánico y sistemas de respuesta inmediata.

## 🚀 Descripción del Proyecto

Aplicación web desarrollada con Next.js 15 que presenta los servicios de seguridad de Coradir, incluyendo:

- **Landing page**: Página principal con secciones informativas sobre servicios y beneficios
- **Formulario de contacto**: Sistema de captura de leads con validación y protección reCAPTCHA v3
- **Diseño responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Animaciones fluidas**: Experiencia de usuario mejorada con Framer Motion
- **SEO optimizado**: Metadata configurada para mejor posicionamiento
- **Analytics integrado**: Google Tag Manager y Google Analytics 4

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura](#-arquitectura)
- [Características Principales](#-características-principales)
- [API Routes](#-api-routes)
- [Componentes](#-componentes)
- [Estilos](#-estilos)

## 🛠 Tecnologías

### Core
- **[Next.js 15.3.3](https://nextjs.org/)** - Framework React con SSR y App Router
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático

### Estilos
- **[Tailwind CSS 4.1.10](https://tailwindcss.com/)** - Framework CSS utility-first
- **[PostCSS](https://postcss.org/)** - Procesador CSS
- **DM Sans** - Tipografía personalizada

### Formularios y Validación
- **[React Hook Form 7.58.1](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod 3.25.67](https://zod.dev/)** - Validación de esquemas
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integración Zod + React Hook Form

### Animaciones
- **[Framer Motion 12.18.1](https://www.framer.com/motion/)** - Animaciones y transiciones

### Seguridad
- **[react-google-recaptcha-v3 1.11.0](https://github.com/t49tran/react-google-recaptcha-v3)** - Protección contra bots

### Analytics
- **Google Tag Manager** - Gestión de tags
- **Google Analytics 4** - Análisis de tráfico

### Herramientas de Desarrollo
- **[ESLint](https://eslint.org/)** - Linter
- **[Turbopack](https://turbo.build/pack)** - Bundler de desarrollo rápido
- **Next.js Dev Mode** - Hot reload y fast refresh

## 📁 Estructura del Proyecto

```
coradir-seguridad/
├── public/
│   ├── fonts/
│   │   └── DM_Sans/           # Familia tipográfica completa
│   ├── icons/                 # Iconos e imágenes SVG/PNG
│   ├── img/                   # Imágenes del sitio
│   ├── videos/                # Videos de fondo
│   └── Boton-antipanico-folleto.pdf
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── verify-captcha/
│   │   │       └── route.ts   # Endpoint de verificación reCAPTCHA
│   │   ├── componentes/
│   │   │   ├── header.tsx/
│   │   │   │   ├── header.tsx
│   │   │   │   └── components/
│   │   │   │       ├── menuMobile.tsx
│   │   │   │       ├── menuDesktop.tsx
│   │   │   │       └── hrCustom.tsx
│   │   │   ├── home/
│   │   │   │   ├── home.tsx
│   │   │   │   └── components/
│   │   │   │       ├── heroSection.tsx
│   │   │   │       ├── discoveredSection.tsx
│   │   │   │       ├── antipanicButtonSection.tsx
│   │   │   │       ├── benefitsSection.tsx
│   │   │   │       ├── benefitsCard.tsx
│   │   │   │       └── safeSection.tsx
│   │   │   └── footer/
│   │   │       └── footer.tsx
│   │   ├── contacto/
│   │   │   ├── page.tsx
│   │   │   └── components/
│   │   │       ├── contact.tsx
│   │   │       ├── customInput.tsx
│   │   │       ├── formSchema.ts
│   │   │       ├── reCaptcha.tsx
│   │   │       └── loader.tsx
│   │   ├── layout.tsx         # Layout raíz con Header/Footer
│   │   ├── page.tsx           # Página principal
│   │   └── globals.css        # Estilos globales y theme
│   └── hooks/
│       └── useMediaQuery.tsx  # Hook para responsive design
├── next.config.ts
├── tsconfig.json
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🔧 Instalación

### Requisitos Previos
- Node.js 20+
- npm, yarn, pnpm o bun

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/coradir-seguridad.git

# Navegar al directorio
cd coradir-seguridad

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# reCAPTCHA v3 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=tu_secret_key_aqui
NEXT_PUBLIC_RECAPTCHA_MIN_SCORE=0.5

# Webhook Configuration (n8n o similar)
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://tu-webhook.com/endpoint

# Analytics (opcional - ya configurado en layout.tsx)
# NEXT_PUBLIC_GA_ID=G-K747C6S23H
# NEXT_PUBLIC_GTM_ID=GTM-WPC2GBF9
```

### Obtener Credenciales reCAPTCHA

1. Visitar [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Registrar un nuevo sitio (v3)
3. Copiar Site Key y Secret Key
4. Agregar al archivo `.env.local`

## 📜 Scripts Disponibles

```bash
# Desarrollo con Turbopack (recomendado)
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción (puerto 6115)
npm run start

# Linting
npm run lint
```

## 🏗 Arquitectura

### App Router (Next.js 15)

El proyecto utiliza el App Router de Next.js con la estructura de directorios `/app`:

- **Server Components**: Por defecto, todos los componentes son del servidor
- **Client Components**: Marcados con `"use client"` (formularios, animaciones, hooks)
- **Streaming SSR**: Renderizado progresivo para mejor performance
- **Metadata API**: SEO configurado a nivel de página

### Patrones de Diseño

#### 1. **Composición de Componentes**
```typescript
// Ejemplo: home.tsx compone múltiples secciones
<HeroSection />
<DiscoveredSection />
<AntipanicButtonSection lineBottomRef={lineRef} />
<BenefitsSection lineBottomRef={lineRef}/>
<SafeSection />
```

#### 2. **Form State Management**
```typescript
// React Hook Form + Zod para validación tipo-segura
const form = useForm<FormSchema>({
  resolver: zodResolver(FormSchema),
  mode: "onChange"
});
```

#### 3. **Custom Hooks**
```typescript
// useMediaQuery para responsive logic
const isMobile = useMediaQuery("(max-width: 768px)");
```

#### 4. **Layout Pattern**
```typescript
// layout.tsx envuelve todas las páginas
<Header />
{children}
<Footer />
```

## ✨ Características Principales

### 1. Sistema de Navegación Dinámico

- **Header adaptativo**: Cambia de transparente a sólido según scroll
- **Auto-hide**: Se oculta al hacer scroll down, reaparece al scroll up
- **Menú responsive**: Hamburger menu en mobile, horizontal en desktop
- **Estado activo**: Fondo rojo en página de contacto y al hover (desktop)

**Implementación**: [header.tsx](src/app/componentes/header.tsx/header.tsx)

### 2. Formulario de Contacto Seguro

#### Características:
- ✅ Validación en tiempo real con Zod
- ✅ Protección reCAPTCHA v3 invisible
- ✅ Mensajes de error/éxito contextuales
- ✅ Estados de carga (loading spinner)
- ✅ Reset automático después de envío exitoso
- ✅ Integración con webhook (n8n/Zapier compatible)

#### Campos Validados:
- **Nombre**: Mínimo 3 caracteres
- **Email**: Formato válido
- **Teléfono**: 10-15 dígitos, formato internacional opcional (+)
- **Mensaje**: Máximo 500 caracteres (opcional)

**Implementación**: [contact.tsx](src/app/contacto/components/contact.tsx)

### 3. Animaciones con Framer Motion

#### Scroll-triggered Animations:
```typescript
// Ejemplo: Hero Section
const isInView = useInView(bannerRef, { amount: 0.5, once: false });

<motion.h1
  initial={{ opacity: 0, x: "50%" }}
  animate={isInView ? { opacity: 1, x: "0%" } : { opacity: 0, x: "50%" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
```

#### Hover Animations:
```typescript
// Ejemplo: Botón de descarga
<motion.div
  initial={{ scale: 1 }}
  animate={isInView ? { scale: 1.1 } : { scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
>
```

### 4. SEO y Analytics

#### Google Tag Manager
```typescript
// Layout.tsx - Script GTM
<Script
  id="gtm-script"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{...}}
/>
```

#### Google Analytics 4
```typescript
// Layout.tsx - Script GA4
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-K747C6S23H"
  strategy="afterInteractive"
/>
```

#### Metadata
```typescript
// page.tsx
export const metadata = {
  title: "Coradir Seguridad",
  description: "Coradir Seguridad"
}
```

### 5. Optimización de Imágenes

Todas las imágenes utilizan `next/image` para:
- Lazy loading automático
- Responsive images
- Optimización de tamaño
- Formato WebP automático

```typescript
<Image
  src="/img/hero.jpg"
  layout="fill"
  priority // Solo para hero
  quality={100}
  alt="Hero"
/>
```

## 🔌 API Routes

### POST /api/verify-captcha

Verifica el token de reCAPTCHA v3 con Google.

**Request Body:**
```json
{
  "token": "string"
}
```

**Response Success (200):**
```json
{
  "ok": true,
  "message": "Formulario recibido"
}
```

**Response Error (400):**
```json
{
  "error": "No pudimos verificar que eres humano..."
}
```

**Implementación**: [route.ts](src/app/api/verify-captcha/route.ts)

## 🧩 Componentes

### Layout y Estructura

#### Header
**Path**: [src/app/componentes/header.tsx/header.tsx](src/app/componentes/header.tsx/header.tsx)

**Características**:
- Scroll behavior dinámico
- Menú mobile/desktop
- Estados de fondo (transparente/rojo)
- Navegación adaptativa

**Subcomponentes**:
- `MenuMobile`: Menú hamburguesa con animación
- `MenuDesktop`: Menú horizontal con hover effects
- `HrCustom`: Separador decorativo

#### Footer
**Path**: [src/app/componentes/footer/footer.tsx](src/app/componentes/footer/footer.tsx)

**Contenido**:
- Logo y marca
- Links de redes sociales
- Información de contacto
- Copyright

### Secciones Home

#### HeroSection
**Path**: [src/app/componentes/home/components/heroSection.tsx](src/app/componentes/home/components/heroSection.tsx)

**Características**:
- Imagen hero full-width
- Título animado con Framer Motion
- Diseño responsive (versión mobile/desktop diferente)

#### DiscoveredSection
Sección explicativa sobre los servicios.

#### AntipanicButtonSection
Detalle del producto estrella: botón antipánico.

#### BenefitsSection
**Path**: [src/app/componentes/home/components/benefitsSection.tsx](src/app/componentes/home/components/benefitsSection.tsx)

**Beneficios destacados**:
1. Respuesta inmediata
2. Geolocalización precisa
3. Diseño discreto y resistente
4. Integración sencilla

Grid de 4 tarjetas con iconos e información.

**Componente hijo**: `BenefitsCard`

#### SafeSection
Video de seguridad y call-to-action final.

### Formulario de Contacto

#### Contact
**Path**: [src/app/contacto/components/contact.tsx](src/app/contacto/components/contact.tsx)

**Flujo**:
1. Usuario completa formulario
2. Validación en tiempo real (Zod)
3. Verificación reCAPTCHA invisible
4. Envío a webhook (n8n)
5. Mensaje de confirmación
6. Reset automático

**Subcomponentes**:
- `CustomInput`: Input reutilizable con validación
- `Loader`: Spinner de carga
- `formSchema.ts`: Esquema Zod de validación

#### FormSchema
**Path**: [src/app/contacto/components/formSchema.ts](src/app/contacto/components/formSchema.ts)

```typescript
export const FormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.string().email("Debes ingresar un email válido."),
  phone: z.string()
    .min(10, "El teléfono debe tener al menos 10 dígitos.")
    .regex(/^\+?\d{10,15}$/, "..."),
  message: z.string().max(500, "...").optional()
});
```

### Hooks Personalizados

#### useMediaQuery
**Path**: [src/hooks/useMediaQuery.tsx](src/hooks/useMediaQuery.tsx)

Hook para detectar breakpoints y hacer componentes responsive.

**Uso**:
```typescript
const isMobile = useMediaQuery("(max-width: 768px)");
const isDesktop = useMediaQuery("(min-width: 1280px)");
```

## 🎨 Estilos

### Theme Configuration

**Path**: [src/app/globals.css](src/app/globals.css)

```css
@theme {
  --font-dm: 'DM Sans', sans-serif;
  --color-red: #600214;        /* Rojo principal */
  --color-red-light: #c09aa1;  /* Rojo claro */
  --color-red-text: #701b2b;   /* Rojo texto */
  --color-white: #FFFFFF;
  --color-black: #000000;
}
```

### Tailwind CSS

Configuración personalizada con:
- Colores de marca
- Tipografía DM Sans
- Utilidades custom (`.container`, `.text-shadow`, `.burger_slide`)
- Sistema de spacing extendido

### Responsive Design

**Breakpoints**:
- `sm`: 640px (mobile)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

**Estrategia**: Mobile-first design

## 🚀 Despliegue

### Build de Producción

```bash
# Construir la aplicación
npm run build

# Iniciar servidor (puerto 6115)
npm run start
```

### Plataformas Recomendadas

#### Vercel (Recomendado)
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático en cada push

#### Otras Opciones
- **Netlify**: Soporte completo Next.js
- **Railway**: Deploy con Docker
- **AWS Amplify**: Integración AWS
- **DigitalOcean App Platform**: VPS con CI/CD

### Variables de Entorno en Producción

Asegurarse de configurar todas las variables en el panel de la plataforma:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_RECAPTCHA_SECRET_KEY`
- `NEXT_PUBLIC_RECAPTCHA_MIN_SCORE`
- `NEXT_PUBLIC_N8N_WEBHOOK_URL`

## 🔒 Seguridad

### Medidas Implementadas

1. **reCAPTCHA v3**: Protección invisible contra bots
2. **Validación de entrada**: Zod schemas en cliente y servidor
3. **Environment variables**: Secrets no expuestos en código
4. **HTTPS only**: Redirección automática en producción
5. **CSP Headers**: Configurables en `next.config.ts`

### Buenas Prácticas

- ✅ No incluir `.env.local` en control de versiones
- ✅ Rotar secrets periódicamente
- ✅ Validar inputs en servidor (API routes)
- ✅ Sanitizar datos antes de enviar a webhooks
- ✅ Monitorear logs de reCAPTCHA

## 📊 Performance

### Optimizaciones Aplicadas

1. **Next.js Image Optimization**: Lazy loading + WebP
2. **Turbopack**: Builds de desarrollo ultra-rápidos
3. **Code Splitting**: Automático por ruta
4. **Font Optimization**: DM Sans self-hosted
5. **Script Strategy**: `afterInteractive` para analytics

### Métricas Objetivo

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🐛 Troubleshooting

### Problemas Comunes

#### Error: "reCAPTCHA not loaded"
```bash
# Verificar que las keys estén configuradas
echo $NEXT_PUBLIC_RECAPTCHA_SITE_KEY

# Reiniciar el servidor
npm run dev
```

#### Formulario no envía
1. Verificar webhook URL en `.env.local`
2. Comprobar score de reCAPTCHA (min 0.5)
3. Revisar logs en navegador

#### Animaciones no funcionan
- Verificar que el componente tenga `"use client"`
- Comprobar que Framer Motion esté instalado
- Limpiar caché: `rm -rf .next && npm run dev`

## 📝 Licencia

Proyecto propietario de **Coradir Seguridad**. Todos los derechos reservados.

## 👥 Contacto

- **Website**: [https://coradirseguridad.com](https://coradirseguridad.com)
- **Email**: info@coradirseguridad.com
- **Redes Sociales**:
  - Facebook
  - Instagram
  - LinkedIn

---

**Última actualización**: Octubre 2025
**Versión**: 0.1.0
**Next.js**: 15.3.3
**React**: 19.0.0
