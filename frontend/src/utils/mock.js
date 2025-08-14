// Mock data for FufuDev portfolio website

export const mockProjects = [
  {
    id: 1,
    name: "FufuBot",
    description: {
      en: "Advanced Discord bot with moderation, music playback, and custom commands. Built with Discord.js and Node.js.",
      fr: "Bot Discord avancé avec modération, lecture de musique et commandes personnalisées. Construit avec Discord.js et Node.js."
    },
    technologies: ["Discord.js", "Node.js", "JavaScript", "MongoDB"],
    status: "active",
    type: "Discord Bot"
  },
  {
    id: 2,
    name: "Amazon Checker",
    description: {
      en: "Automated Discord bot that monitors Amazon product prices and sends notifications. Features real-time price tracking and alerts.",
      fr: "Bot Discord automatisé qui surveille les prix des produits Amazon et envoie des notifications. Fonctionnalités de suivi des prix en temps réel et d'alertes."
    },
    technologies: ["Discord.js", "Python", "Amazon API", "Web Scraping"],
    status: "active",
    type: "Discord Bot"
  }
];

export const mockServices = [
  {
    id: 1,
    title: {
      en: "Web Development",
      fr: "Développement Web"
    },
    description: {
      en: "Modern, responsive websites and web applications using the latest technologies.",
      fr: "Sites web et applications web modernes et réactifs utilisant les dernières technologies."
    },
    icon: "Globe"
  },
  {
    id: 2,
    title: {
      en: "Discord Bots",
      fr: "Bots Discord"
    },
    description: {
      en: "Custom Discord bots with moderation, automation, and entertainment features.",
      fr: "Bots Discord personnalisés avec des fonctionnalités de modération, d'automatisation et de divertissement."
    },
    icon: "Bot"
  },
  {
    id: 3,
    title: {
      en: "Automation Tools",
      fr: "Outils d'Automatisation"
    },
    description: {
      en: "Scripts and tools to automate repetitive tasks and improve productivity.",
      fr: "Scripts et outils pour automatiser les tâches répétitives et améliorer la productivité."
    },
    icon: "Settings"
  },
  {
    id: 4,
    title: {
      en: "API Integration",
      fr: "Intégration d'API"
    },
    description: {
      en: "Seamless integration of third-party APIs and services into your applications.",
      fr: "Intégration transparente d'API et de services tiers dans vos applications."
    },
    icon: "Plug"
  }
];

export const mockPersonalInfo = {
  name: "FufuDev",
  email: "b22041702@gmail.com",
  bio: {
    en: "Passionate developer specializing in web development and Discord bot creation. I love building innovative solutions that solve real-world problems and enhance user experiences.",
    fr: "Développeur passionné spécialisé dans le développement web et la création de bots Discord. J'aime créer des solutions innovantes qui résolvent des problèmes du monde réel et améliorent l'expérience utilisateur."
  },
  skills: ["JavaScript", "Python", "Node.js", "React", "MongoDB", "Discord.js", "Web Scraping", "API Integration"],
  location: {
    en: "Available for remote work",
    fr: "Disponible pour le travail à distance"
  }
};

export const mockTestimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: {
      en: "Community Manager",
      fr: "Gestionnaire de Communauté"
    },
    content: {
      en: "FufuBot transformed our Discord server! The moderation features and custom commands work perfectly.",
      fr: "FufuBot a transformé notre serveur Discord ! Les fonctionnalités de modération et les commandes personnalisées fonctionnent parfaitement."
    },
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: {
      en: "E-commerce Owner",
      fr: "Propriétaire E-commerce"
    },
    content: {
      en: "The Amazon Checker bot helped me track competitor prices effortlessly. Great automation tool!",
      fr: "Le bot Amazon Checker m'a aidé à suivre les prix des concurrents sans effort. Excellent outil d'automatisation !"
    },
    rating: 5
  }
];