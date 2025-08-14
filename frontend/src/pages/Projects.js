import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, Calendar, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projectsAPI } from '../services/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Projects = () => {
  const { language } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsAPI.getAll();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const content = {
    en: {
      title: "My Projects",
      subtitle: "Explore my portfolio of Discord bots and automation tools",
      status: "Status",
      technologies: "Technologies Used",
      viewCode: "View Code",
      liveDemo: "Live Demo",
      active: "Active",
      completed: "Completed"
    },
    fr: {
      title: "Mes Projets",
      subtitle: "Explorez mon portfolio de bots Discord et d'outils d'automatisation",
      status: "Statut",
      technologies: "Technologies Utilisées",
      viewCode: "Voir le Code",
      liveDemo: "Démo en Direct",
      active: "Actif",
      completed: "Terminé"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-8">
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.name}
                  </CardTitle>
                  <Badge 
                    variant={project.status === 'active' ? 'default' : 'secondary'}
                    className={`${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    } rounded-full px-3 py-1`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    {project.status === 'active' ? content[language].active : content[language].completed}
                  </Badge>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{project.type}</span>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {project.description[language]}
                </p>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    {content[language].technologies}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full px-3 py-1 text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    disabled
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {content[language].viewCode}
                  </Button>
                  
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center"
                    disabled
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {content[language].liveDemo}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {language === 'en' 
                      ? "This project is part of my Discord bot development portfolio. Contact me for more details or custom bot development."
                      : "Ce projet fait partie de mon portfolio de développement de bots Discord. Contactez-moi pour plus de détails ou pour le développement de bots personnalisés."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? "Need a Custom Bot?" : "Besoin d'un Bot Personnalisé ?"}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'en' 
                ? "I specialize in creating custom Discord bots tailored to your community's needs."
                : "Je me spécialise dans la création de bots Discord personnalisés adaptés aux besoins de votre communauté."
              }
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3">
              {language === 'en' ? "Get in Touch" : "Contactez-moi"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;