import React from 'react';
import { Globe, Bot, Settings, Plug, Check, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockServices } from '../utils/mock';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Services = () => {
  const { language } = useLanguage();

  const iconMap = {
    Globe,
    Bot,
    Settings,
    Plug
  };

  const content = {
    en: {
      title: "My Services",
      subtitle: "Professional development services tailored to your needs",
      getQuote: "Get Quote",
      features: {
        title: "Why Choose My Services?",
        items: [
          "Custom solutions tailored to your requirements",
          "Clean, maintainable code with documentation",
          "Ongoing support and maintenance",
          "Fast delivery and responsive communication",
          "Competitive pricing for quality work"
        ]
      },
      process: {
        title: "My Development Process",
        steps: [
          {
            title: "Consultation",
            description: "We discuss your requirements and project goals"
          },
          {
            title: "Planning",
            description: "I create a detailed project plan and timeline"
          },
          {
            title: "Development",
            description: "I build your solution with regular updates"
          },
          {
            title: "Delivery",
            description: "Testing, deployment, and handover of your project"
          }
        ]
      }
    },
    fr: {
      title: "Mes Services",
      subtitle: "Services de développement professionnel adaptés à vos besoins",
      getQuote: "Obtenir un Devis",
      features: {
        title: "Pourquoi Choisir Mes Services ?",
        items: [
          "Solutions personnalisées adaptées à vos exigences",
          "Code propre et maintenable avec documentation",
          "Support et maintenance continus",
          "Livraison rapide et communication réactive",
          "Prix compétitifs pour un travail de qualité"
        ]
      },
      process: {
        title: "Mon Processus de Développement",
        steps: [
          {
            title: "Consultation",
            description: "Nous discutons de vos exigences et objectifs de projet"
          },
          {
            title: "Planification",
            description: "Je crée un plan de projet détaillé et un calendrier"
          },
          {
            title: "Développement",
            description: "Je construis votre solution avec des mises à jour régulières"
          },
          {
            title: "Livraison",
            description: "Tests, déploiement et remise de votre projet"
          }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {mockServices.map((service) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="text-center p-8">
                  <div className="mx-auto mb-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title[language]}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed">
                    {service.description[language]}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 rounded-lg"
                  >
                    {content[language].getQuote}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-20">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              {content[language].features.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content[language].features.items.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {content[language].process.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content[language].process.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  {index < content[language].process.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 dark:bg-gray-600 -ml-8" />
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-3xl mx-auto">
            <Star className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? "Ready to Start Your Project?" : "Prêt à Commencer Votre Projet ?"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'en' 
                ? "Let's discuss your requirements and bring your ideas to life."
                : "Discutons de vos exigences et donnons vie à vos idées."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3">
              {language === 'en' ? "Contact Me Now" : "Contactez-moi Maintenant"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;