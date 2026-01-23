'use client';

import { useState, useEffect } from 'react';
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUploader } from "@/components/admin/image-uploader";
import { MultiImageUploader } from "@/components/admin/multi-image-uploader";
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  MessageSquare,
  FileText,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  LogOut,
  User,
  ExternalLink,
  Image as ImageIcon
} from "lucide-react";
import { useRouter } from 'next/navigation';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: string;
}

interface Quote {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  items: Array<{
    productName: string;
    quantity: number;
    notes?: string;
    isCustom?: boolean;
  }>;
  totalItems: number;
  status: 'new' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  notes?: string;
  createdAt: string;
}

interface Gallery {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  coverImage: string;
  images: Array<{
    url: string;
    caption?: string;
    order: number;
  }>;
  category?: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'contacts' | 'quotes' | 'galleries'>('contacts');
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    coverImage: '',
    images: [] as Array<{ url: string; caption?: string; order: number }>,
    category: '',
    isPublished: false,
    order: 0,
  });
  const router = useRouter();

  useEffect(() => {
    fetchData();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
      // Don't redirect here - let middleware handle it
    } catch (error) {
      // Don't redirect here - let middleware handle it
    }
  };

  const fetchData = async () => {
    try {
      const [contactsRes, quotesRes, galleriesRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/quote'),
        fetch('/api/gallery')
      ]);
      
      const contactsData = await contactsRes.json();
      const quotesData = await quotesRes.json();
      const galleriesData = await galleriesRes.json();
      
      setContacts(contactsData);
      setQuotes(quotesData);
      setGalleries(galleriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, status: status as Contact['status'] } : contact
        ));
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const updateQuoteStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/quote/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        setQuotes(quotes.map(quote => 
          quote._id === id ? { ...quote, status: status as Quote['status'] } : quote
        ));
      }
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== id));
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;
    
    try {
      const response = await fetch(`/api/quote/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setQuotes(quotes.filter(quote => quote._id !== id));
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Gallery CRUD functions
  const handleCreateGallery = async () => {
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm),
      });
      
      if (response.ok) {
        fetchData();
        setShowGalleryForm(false);
        resetGalleryForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create gallery');
      }
    } catch (error) {
      console.error('Error creating gallery:', error);
      alert('Failed to create gallery');
    }
  };

  const handleUpdateGallery = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm),
      });
      
      if (response.ok) {
        fetchData();
        setShowGalleryForm(false);
        setEditingGallery(null);
        resetGalleryForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update gallery');
      }
    } catch (error) {
      console.error('Error updating gallery:', error);
      alert('Failed to update gallery');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return;
    
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete gallery');
      }
    } catch (error) {
      console.error('Error deleting gallery:', error);
      alert('Failed to delete gallery');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      
      if (response.ok) {
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update publish status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
      alert('Failed to update publish status');
    }
  };

  const resetGalleryForm = () => {
    setGalleryForm({
      title: '',
      description: '',
      coverImage: '',
      images: [],
      category: '',
      isPublished: false,
      order: 0,
    });
  };

  const handleEditGallery = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setGalleryForm({
      title: gallery.title,
      description: gallery.description || '',
      coverImage: gallery.coverImage,
      images: gallery.images,
      category: gallery.category || '',
      isPublished: gallery.isPublished,
      order: gallery.order,
    });
    setShowGalleryForm(true);
  };

  const handleCoverImageUploaded = (url: string) => {
    setGalleryForm({
      ...galleryForm,
      coverImage: url,
    });
  };

  const handleGalleryImagesChange = (images: Array<{ url: string; caption?: string; order: number }>) => {
    setGalleryForm({
      ...galleryForm,
      images,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      read: { color: 'bg-yellow-100 text-yellow-800', icon: Eye },
      replied: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      closed: { color: 'bg-gray-100 text-gray-800', icon: XCircle },
      reviewed: { color: 'bg-purple-100 text-purple-800', icon: Eye },
      quoted: { color: 'bg-indigo-100 text-indigo-800', icon: FileText },
      accepted: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <Text>Loading admin panel...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionContainer size="xl" padding="xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <Heading level={1} className="heading-black mb-2">
                Admin Panel
              </Heading>
              <Text className="body-text-black-muted">
                Manage contact forms and quote requests
              </Text>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* User Info & Actions */}
              <div className="flex items-center gap-3">
                {user && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <User className="h-4 w-4 text-gray-600" />
                    <Text size="sm" className="body-text-black">
                      {user.username}
                    </Text>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('http://mail.athenadevtech.com', '_blank')}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Webmail
                  <ExternalLink className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
              
              {/* Tab Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'contacts' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('contacts')}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Contacts ({contacts.length})
                </Button>
                <Button
                  variant={activeTab === 'quotes' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('quotes')}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Quotes ({quotes.length})
                </Button>
                <Button
                  variant={activeTab === 'galleries' ? 'primary' : 'outline'}
                  onClick={() => setActiveTab('galleries')}
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Galleries ({galleries.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Text className="body-text-black-muted">No contact submissions yet</Text>
                  </CardContent>
                </Card>
              ) : (
                contacts.map((contact) => (
                  <Card key={contact._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Heading level={4} className="heading-black">
                              {contact.firstName} {contact.lastName}
                            </Heading>
                            {getStatusBadge(contact.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <a href={`mailto:${contact.email}`} className="body-text-black-muted hover:text-primary">
                                {contact.email}
                              </a>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <a href={`tel:${contact.phone}`} className="body-text-black-muted hover:text-primary">
                                  {contact.phone}
                                </a>
                              </div>
                            )}
                            {contact.company && (
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                <span className="body-text-black-muted">{contact.company}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="body-text-black-muted">{formatDate(contact.createdAt)}</span>
                            </div>
                          </div>
                          
                          {contact.subject && (
                            <div>
                              <Text weight="semibold" className="body-text-black mb-1">Subject:</Text>
                              <Text className="body-text-black-muted">{contact.subject}</Text>
                            </div>
                          )}
                          
                          <div>
                            <Text weight="semibold" className="body-text-black mb-1">Message:</Text>
                            <Text className="body-text-black-muted">{contact.message}</Text>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 lg:min-w-[200px]">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact._id, 'read')}
                              disabled={contact.status === 'read'}
                            >
                              Mark Read
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact._id, 'replied')}
                              disabled={contact.status === 'replied'}
                            >
                              Mark Replied
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact._id, 'closed')}
                              disabled={contact.status === 'closed'}
                            >
                              Close
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteContact(contact._id)}
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Galleries Tab */}
          {activeTab === 'galleries' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Heading level={2} className="text-2xl font-bold">
                  Gallery Management
                </Heading>
                <Button 
                  onClick={() => {
                    resetGalleryForm();
                    setEditingGallery(null);
                    setShowGalleryForm(true);
                  }}
                >
                  + Create New Album
                </Button>
              </div>

              {showGalleryForm && (
                <Card className="mb-6 p-6">
                  <Heading level={3} className="text-xl font-bold mb-4">
                    {editingGallery ? 'Edit Album' : 'Create New Album'}
                  </Heading>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title *</label>
                      <input
                        type="text"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Album title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows={3}
                        placeholder="Album description"
                      />
                    </div>

                    <ImageUploader
                      label="Cover Image *"
                      onImageUploaded={handleCoverImageUploaded}
                      currentImage={galleryForm.coverImage}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="e.g., Factory, Products, Events"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Order</label>
                      <input
                        type="number"
                        value={galleryForm.order}
                        onChange={(e) => setGalleryForm({ ...galleryForm, order: parseInt(e.target.value) || 0 })}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={galleryForm.isPublished}
                          onChange={(e) => setGalleryForm({ ...galleryForm, isPublished: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">Published</span>
                      </label>
                    </div>

                    <MultiImageUploader
                      images={galleryForm.images}
                      onImagesChange={handleGalleryImagesChange}
                    />

                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          if (editingGallery) {
                            handleUpdateGallery(editingGallery._id);
                          } else {
                            handleCreateGallery();
                          }
                        }}
                      >
                        {editingGallery ? 'Update Album' : 'Create Album'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowGalleryForm(false);
                          setEditingGallery(null);
                          resetGalleryForm();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleries.map((gallery) => (
                  <Card key={gallery._id} className="overflow-hidden">
                    <img
                      src={gallery.coverImage}
                      alt={gallery.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Heading level={4} className="text-lg font-bold">
                          {gallery.title}
                        </Heading>
                        <Badge variant={gallery.isPublished ? 'default' : 'secondary'}>
                          {gallery.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      
                      {gallery.description && (
                        <Text className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {gallery.description}
                        </Text>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <ImageIcon className="h-4 w-4" />
                        <span>{gallery.images.length} images</span>
                        {gallery.category && (
                          <>
                            <span>•</span>
                            <span>{gallery.category}</span>
                          </>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEditGallery(gallery)}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleTogglePublish(gallery._id, gallery.isPublished)}
                          variant="outline"
                          size="sm"
                        >
                          {gallery.isPublished ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button
                          onClick={() => handleDeleteGallery(gallery._id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {galleries.length === 0 && !showGalleryForm && (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Text className="body-text-black-muted">No galleries yet. Create your first album!</Text>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              {quotes.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Text className="body-text-black-muted">No quote requests yet</Text>
                  </CardContent>
                </Card>
              ) : (
                quotes.map((quote) => (
                  <Card key={quote._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Heading level={4} className="heading-black">
                              {quote.firstName} {quote.lastName}
                            </Heading>
                            {getStatusBadge(quote.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <a href={`mailto:${quote.email}`} className="body-text-black-muted hover:text-primary">
                                {quote.email}
                              </a>
                            </div>
                            {quote.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <a href={`tel:${quote.phone}`} className="body-text-black-muted hover:text-primary">
                                  {quote.phone}
                                </a>
                              </div>
                            )}
                            {quote.company && (
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-gray-500" />
                                <span className="body-text-black-muted">{quote.company}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="body-text-black-muted">{formatDate(quote.createdAt)}</span>
                            </div>
                          </div>
                          
                          <div>
                            <Text weight="semibold" className="body-text-black mb-2">
                              Items ({quote.totalItems} total):
                            </Text>
                            <div className="space-y-2">
                              {quote.items.map((item, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <Text weight="semibold" className="body-text-black">
                                      {item.productName}
                                    </Text>
                                    <Badge variant="outline">
                                      Qty: {item.quantity}
                                    </Badge>
                                  </div>
                                  {item.notes && (
                                    <Text className="body-text-black-muted text-sm mt-1">
                                      Notes: {item.notes}
                                    </Text>
                                  )}
                                  {item.isCustom && (
                                    <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">
                                      Custom Product
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {quote.notes && (
                            <div>
                              <Text weight="semibold" className="body-text-black mb-1">Additional Notes:</Text>
                              <Text className="body-text-black-muted">{quote.notes}</Text>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2 lg:min-w-[200px]">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuoteStatus(quote._id, 'reviewed')}
                              disabled={quote.status === 'reviewed'}
                            >
                              Review
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuoteStatus(quote._id, 'quoted')}
                              disabled={quote.status === 'quoted'}
                            >
                              Quote
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuoteStatus(quote._id, 'accepted')}
                              disabled={quote.status === 'accepted'}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuoteStatus(quote._id, 'rejected')}
                              disabled={quote.status === 'rejected'}
                            >
                              Reject
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteQuote(quote._id)}
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}
