import screenshots from './projectScreenshots.json';

const featuredProjects = [
  {
    id: 'umaba',
    name: 'UMABA',
    category: 'Public services · Animal welfare',
    title: 'From citizen request to veterinary care.',
    description: 'A citizen portal and administrative platform for Mérida’s municipal pet sterilization program. It brings appointment requests, pet registration, clinical workflows and payment management into one system for citizens and municipal staff.',
    features: [
      { title: 'Citizen self-service', text: 'Owner and pet registration, supporting documents and appointment availability in a guided booking flow.' },
      { title: 'Clinical operations', text: 'Application review, reception, veterinary records and cash desk workflows with access by role.' },
      { title: 'Operational visibility', text: 'Administrative dashboards, staff management, audit logs and program coverage reports.' },
    ],
    stack: [
      { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'shadcn/ui'] },
      { label: 'Backend & data', items: ['NestJS', 'PostgreSQL', 'TypeORM', 'Supabase', 'JWT'] },
    ],
    accent: '#79d6ac',
    images: screenshots.umaba,
  },
  {
    id: 'jaque',
    name: 'JAQUE Client Portal',
    category: 'Interior design · Project management',
    title: 'Every project. One shared workspace.',
    description: 'A branded client portal for JAQUE Design, an interior design and construction firm. It centralizes project progress, deliverables, approvals, invoices and documents so clients and the design team can follow the same process from discovery to closeout.',
    features: [
      { title: 'Project tracking', text: 'Project workspaces with phases, milestones and dedicated views for clients and project managers.' },
      { title: 'Reviews & collaboration', text: 'Deliverable approvals, change requests, project files and team access organized around each project.' },
      { title: 'Administration', text: 'Role-based access, activity history and integration settings, including DocuSign configuration.' },
    ],
    stack: [
      { label: 'Frontend', items: ['Next.js', 'TypeScript'] },
      { label: 'Backend & data', items: ['NestJS', 'PostgreSQL'] },
      { label: 'Services', items: ['AWS S3', 'CloudFront', 'Resend', 'DocuSign'] },
    ],
    stackNote: 'Technology stack documented in the project specifications.',
    accent: '#d8c29c',
    images: screenshots.jaque,
  },
  {
    id: 'app-paqueteria',
    name: 'Paquetería Mérida',
    category: 'Local logistics · Parcel delivery',
    type: 'Mobile application',
    format: 'mobile',
    title: 'Local deliveries, from pickup to doorstep.',
    description: 'A personal mobile project for local parcel pickup and delivery in Mérida. Built with Flutter and a Node.js API, it connects customers, couriers and administrators through shipment requests, delivery updates and map-based tracking.',
    features: [
      { title: 'Book & manage deliveries', text: 'Pickup and destination selection, saved addresses, delivery options and shipment history in one mobile flow.' },
      { title: 'Follow every stage', text: 'Mapbox maps and routes, courier location updates and a status timeline from assignment to delivery, with push and in-app notifications.' },
      { title: 'Accounts & payments', text: 'Role-based access for customers, couriers and administrators, email and SMS verification, and card payment integration with Stripe.' },
    ],
    stack: [
      { label: 'Mobile', items: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Dio'] },
      { label: 'Backend & data', items: ['Node.js', 'Express', 'PostgreSQL', 'Supabase Auth', 'Supabase Realtime'] },
      { label: 'Integrations', items: ['Mapbox', 'Firebase FCM', 'Stripe', 'Resend', 'Twilio Verify'] },
    ],
    repository: 'https://github.com/CA4RL0S/app-paqueteria',
    accent: '#ff9d88',
    images: screenshots.paqueteria,
  },
];

export default featuredProjects;
