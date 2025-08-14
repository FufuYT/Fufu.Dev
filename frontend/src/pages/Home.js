import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockProjects, mockTestimonials } from '../utils/mock';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: "FufuDev – Creating innovative web solutions and tools",
        subtitle: "Custom development, modern interfaces, and optimized performance",
        cta: "View my projects"
      },
      stats: {
        projects: "Projects Completed",
        clients: "Happy Clients",
        experience: "Years Experience"
      },
      featured: {
        title: "Featured Projects",
        subtitle: "Discover my latest Discord bot creations"
      },
      testimonials: {
        title: "What Clients Say",
        subtitle: "Real feedback from satisfied users"
      }
    },
    fr: {
      hero: {
        title: "FufuDev – Création de solutions web innovantes et d'outils",
        subtitle: "Développement personnalisé, interfaces modernes et performances optimisées",
        cta: "Voir mes projets"
      },
      stats: {
        projects: "Projets Terminés",
        clients: "Clients Satisfaits",
        experience: "Années d'Expérience"
      },
      featured: {
        title: "Projets en Vedette",
        subtitle: "Découvrez mes dernières créations de bots Discord"
      },
      testimonials: {
        title: "Ce que disent les clients",
        subtitle: "Commentaires réels d'utilisateurs satisfaits"
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Professional Developer' : 'Développeur Professionnel'}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {content[language].hero.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {content[language].hero.subtitle}
            </p>
            
            <Link to="/projects">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                {content[language].hero.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2+</div>
              <div className="text-gray-600 dark:text-gray-400">{content[language].stats.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-400">{content[language].stats.clients}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2+</div>
              <div className="text-gray-600 dark:text-gray-400">{content[language].stats.experience}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content[language].featured.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {content[language].featured.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 rounded-xl border-0 shadow-lg bg-white dark:bg-gray-900">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{project.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {project.description[language]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link to="/projects">
                    <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 rounded-lg">
                      {language === 'en' ? 'View Details' : 'Voir les Détails'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content[language].testimonials.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {content[language].testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="rounded-xl border-0 shadow-lg bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role[language]}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{testimonial.content[language]}"
                  </p>
                  
                  <div className="flex mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 text-yellow-400 fill-current">★</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;