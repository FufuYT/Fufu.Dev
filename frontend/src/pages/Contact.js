import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: "Get in Touch",
      subtitle: "Ready to start your project? Let's discuss your ideas and bring them to life.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        email: "Email Address",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject",
        subjectPlaceholder: "What's this about?",
        message: "Message",
        messagePlaceholder: "Tell me about your project or question...",
        submit: "Send Message",
        sending: "Sending..."
      },
      contact: {
        title: "Contact Information",
        email: "Email",
        response: "Response Time",
        responseTime: "Within 24 hours",
        availability: "Availability",
        availabilityTime: "Monday - Friday, 9AM - 6PM"
      },
      services: {
        title: "What I Can Help With",
        items: [
          "Discord Bot Development",
          "Web Application Development",
          "API Integration & Automation",
          "Code Review & Consultation"
        ]
      }
    },
    fr: {
      title: "Contactez-moi",
      subtitle: "Prêt à commencer votre projet ? Discutons de vos idées et donnons-leur vie.",
      form: {
        name: "Nom Complet",
        namePlaceholder: "Votre nom complet",
        email: "Adresse Email",
        emailPlaceholder: "votre.email@exemple.com",
        subject: "Sujet",
        subjectPlaceholder: "De quoi s'agit-il ?",
        message: "Message",
        messagePlaceholder: "Parlez-moi de votre projet ou question...",
        submit: "Envoyer le Message",
        sending: "Envoi en cours..."
      },
      contact: {
        title: "Informations de Contact",
        email: "Email",
        response: "Temps de Réponse",
        responseTime: "Dans les 24 heures",
        availability: "Disponibilité",
        availabilityTime: "Lundi - Vendredi, 9h - 18h"
      },
      services: {
        title: "Comment Je Peux Aider",
        items: [
          "Développement de Bots Discord",
          "Développement d'Applications Web",
          "Intégration d'API et Automatisation",
          "Révision de Code et Consultation"
        ]
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: language === 'en' ? "Message Sent!" : "Message Envoyé !",
        description: language === 'en' 
          ? "Thank you for your message. I'll get back to you soon!"
          : "Merci pour votre message. Je vous répondrai bientôt !",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: language === 'en' ? "Error" : "Erreur",
        description: language === 'en' 
          ? "Something went wrong. Please try again."
          : "Quelque chose s'est mal passé. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="p-8 pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                  {language === 'en' ? 'Send me a message' : 'Envoyez-moi un message'}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                        {content[language].form.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={content[language].form.namePlaceholder}
                        required
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        {content[language].form.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={content[language].form.emailPlaceholder}
                        required
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                      {content[language].form.subject}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={content[language].form.subjectPlaceholder}
                      required
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                      {content[language].form.message}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={content[language].form.messagePlaceholder}
                      rows={6}
                      required
                      className="rounded-lg resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 text-lg font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {content[language].form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {content[language].form.submit}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="rounded-2xl border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {content[language].contact.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{content[language].contact.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">b22041702@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{content[language].contact.response}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{content[language].contact.responseTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{content[language].contact.availability}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{content[language].contact.availabilityTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {content[language].services.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 pt-0">
                <div className="space-y-3">
                  {content[language].services.items.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;