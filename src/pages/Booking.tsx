import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Booking = () => {
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '',
    room: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roomTypes = [
    { value: 'deluxe-suite', label: 'Deluxe Suite - From ₵250' },
    { value: 'premium-king', label: 'Premium King - From ₵200' },
    { value: 'classic-double', label: 'Classic Double - From ₵150' },
    { value: 'twin-standard', label: 'Twin Standard - From ₵120' },
    { value: 'executive-studio', label: 'Executive Studio - From ₵300' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast({
        title: "Please select dates",
        description: "Check-in and check-out dates are required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.guests || !formData.room) {
      toast({
        title: "Please fill all required fields",
        description: "All fields except notes are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with actual booking service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Booking Request Submitted!",
        description: "We'll contact you within 24 hours to confirm your reservation.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        guests: '',
        room: '',
        notes: ''
      });
      setCheckIn(undefined);
      setCheckOut(undefined);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-primary mb-6"
          >
            Book Your Stay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Reserve your perfect retreat at Danso Plaza. 
            We'll confirm your booking within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-elegant"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-primary mb-6">
                  Guest Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 border-border rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 border-border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="h-12 border-border rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-foreground">
                      Number of Guests *
                    </Label>
                    <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                      <SelectTrigger className="h-12 border-border rounded-xl">
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border">
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5+">5+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-6">
                <h2 className="text-2xl font-light text-primary mb-6">
                  Booking Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Check-in Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal border-border rounded-xl",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          {checkIn ? format(checkIn, "PPP") : "Select check-in date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border border-border" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Check-out Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal border-border rounded-xl",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          {checkOut ? format(checkOut, "PPP") : "Select check-out date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border border-border" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date <= (checkIn || new Date())}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Room Type *</Label>
                  <Select value={formData.room} onValueChange={(value) => handleInputChange('room', value)}>
                    <SelectTrigger className="h-12 border-border rounded-xl">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      {roomTypes.map((room) => (
                        <SelectItem key={room.value} value={room.value}>
                          {room.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-foreground">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special requests or notes..."
                    className="min-h-24 border-border rounded-xl resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                className="pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-premium h-14 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    'Submit Booking Request'
                  )}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  We'll contact you within 24 hours to confirm your reservation
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Booking;