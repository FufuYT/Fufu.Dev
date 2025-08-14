import React from 'react';
import { Code, Heart, Coffee, Award, MapPin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockPersonalInfo } from '../utils/mock';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About Me",
      subtitle: "Get to know the developer behind FufuDev",
      skills: "Skills & Technologies",
      journey: {
        title: "My Journey",
        content: "I started my development journey with a passion for creating solutions that make a difference. Specializing in Discord bot development and web applications, I've helped numerous communities enhance their server experiences with custom automation and interactive features."
      },
      values: {
        title: "My Values",
        items: [
          {
            icon: Code,
            title: "Clean Code",
            description: "I believe in writing maintainable, well-documented code that stands the test of time."
          },
          {
            icon: Heart,
            title: "User-Focused",
            description: "Every project starts with understanding user needs and creating intuitive experiences."
          },
          {
            icon: Coffee,
            title: "Continuous Learning",
            description: "Technology evolves rapidly, and I'm committed to staying current with the latest trends."
          }
        ]
      },
      contact: {
        title: "Let's Connect",
        description: "Ready to discuss your next project? I'd love to hear from you."
      }
    },
    fr: {
      title: "À Propos de Moi",
      subtitle: "Découvrez le développeur derrière FufuDev",
      skills: "Compétences et Technologies",
      journey: {
        title: "Mon Parcours",
        content: "J'ai commencé mon parcours de développement avec une passion pour créer des solutions qui font la différence. Spécialisé dans le développement de bots Discord et les applications web, j'ai aidé de nombreuses communautés à améliorer leurs expériences de serveur avec des fonctionnalités d'automatisation et interactives personnalisées."
      },
      values: {
        title: "Mes Valeurs",
        items: [
          {
            icon: Code,
            title: "Code Propre",
            description: "Je crois en l'écriture de code maintenable et bien documenté qui résiste à l'épreuve du temps."
          },
          {
            icon: Heart,
            title: "Centré sur l'Utilisateur",
            description: "Chaque projet commence par comprendre les besoins des utilisateurs et créer des expériences intuitives."
          },
          {
            icon: Coffee,
            title: "Apprentissage Continu",
            description: "La technologie évolue rapidement, et je m'engage à rester à jour avec les dernières tendances."
          }
        ]
      },
      contact: {
        title: "Connectons-nous",
        description: "Prêt à discuter de votre prochain projet ? J'aimerais avoir de vos nouvelles."
      }
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {content[language].title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800 text-center">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Code className="w-16 h-16 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {mockPersonalInfo.name}
                </h2>
                
                <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{mockPersonalInfo.location[language]}</span>
                </div>
                
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{mockPersonalInfo.email}</span>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  {language === 'en' ? 'Download Resume' : 'Télécharger CV'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio Section */}
            <Card className="rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {content[language].journey.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {mockPersonalInfo.bio[language]}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {content[language].journey.content}
                </p>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {content[language].skills}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mockPersonalInfo.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="px-4 py-2 text-sm rounded-full">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {content[language].values.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content[language].values.items.map((value, index) => {
              const IconComponent = value.icon;
              
              return (
                <Card key={index} className="text-center rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {content[language].contact.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {content[language].contact.description}
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3">
                {language === 'en' ? 'Get in Touch' : 'Contactez-moi'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;