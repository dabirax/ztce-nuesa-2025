import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  gender: z.enum(["Male", "Female", "Prefer not to say"], {
    required_error: "Please select a gender",
  }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
});

const step2Schema = z.object({
  institutionName: z.string().min(2, "Institution name is required"),
  faculty: z.string().min(2, "Faculty is required"),
  department: z.string().min(2, "Department is required"),
  level: z.string().min(1, "Please select your level"),
  hearAbout: z.string().min(1, "Please select an option"),
  expectations: z.string().min(10, "Please share your expectations (minimum 10 characters)").optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type FormData = Step1Data & Step2Data;

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    control: controlStep1,
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: step1Data || undefined,
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    setValue: setValueStep2,
    watch: watchStep2,
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
    toast.success("Step 1 completed!");
  };

  // const onStep2Submit = (data: Step2Data) => {
  //   const completeData = { ...step1Data!, ...data };
  //   setSubmittedData(completeData);
  //   setIsSubmitted(true);
  //   toast.success("Registration successful! 🎉");
  //   console.log("Registration Data:", completeData);
  // };

const onStep2Submit = async (data: Step2Data) => {
  if (!step1Data) return;

  const completeData = { 
    fullName: step1Data.fullName,
    gender: step1Data.gender,
    dateOfBirth: step1Data.dateOfBirth,
    phoneNumber: step1Data.phoneNumber,
    email: step1Data.email,
    institutionName: data.institutionName,
    faculty: data.faculty,
    department: data.department,
    level: data.level,
    heardFrom: data.hearAbout,
    expectations: data.expectations,
  };

  try {
    const response = await fetch("https://ztce-backend.onrender.com/api/attendees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(completeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server Error:", errorData);
      toast.error(errorData.message || "Failed to register. Please try again.");
      return;
    }

    const result = await response.json();
    console.log("Server Response:", result);

    toast.success("Registration successful! 🎉");
    setSubmittedData(completeData);
    setIsSubmitted(true);
  } catch (error) {
    console.error("Network Error:", error);
    toast.error("Unable to connect to the server. Please check your internet.");
  }
};


  const goToPreviousStep = () => {
    setCurrentStep(1);
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-muted">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="text-primary h-20 w-20" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Registration Successful!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for registering for #ZTCE2025!
            </p>
            <Card className="p-6 bg-muted border-2 border-primary text-left mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Registration Summary</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {submittedData.fullName}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Institution:</strong> {submittedData.institutionName}</p>
                <p><strong>Department:</strong> {submittedData.department}</p>
                <p><strong>Level:</strong> {submittedData.level}</p>
              </div>
            </Card>
            <p className="text-muted-foreground mb-6">
              You'll receive updates and further information via email and WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button 
                onClick={() => window.print()}
                variant="outline"
                size="lg"
              >
                Print Summary
              </Button> */}
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setStep1Data(null);
                  setSubmittedData(null);
                }}
                size="lg"
              >
                Register Another Participant
              </Button>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  
                }}
                size="lg"
              ><Link to="/">
                Back to Home
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-muted">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Register for ZTCE 2025
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete the form below to secure your spot
          </p>
        </div>

        {/* Progress Indicator */}
        {/* <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted border-2 border-border'} font-semibold`}>
              1
            </div>
            <div className={`h-1 w-20 ${currentStep >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted border-2 border-border'} font-semibold`}>
              2
            </div>
          </div>
        </div> */}

        <Card className="p-6 md:p-8">
          {currentStep === 1 ? (
            <form onSubmit={handleSubmitStep1(onStep1Submit)} className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground flex justify-center">Personal Information</h2>
                <p className="text-muted-foreground">Step 1 of 2</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...registerStep1("fullName")}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                  {errorsStep1.fullName && (
                    <p className="text-sm text-destructive mt-1">{errorsStep1.fullName.message}</p>
                  )}
                </div>

                <div>
  <Label>Gender *</Label>
  <Controller
    name="gender"
    control={controlStep1} // We'll fix typing below
    render={({ field }) => (
      <RadioGroup
        onValueChange={field.onChange}
        value={field.value}
        className="flex gap-4 mt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Prefer not to say" id="other" />
          <Label htmlFor="other">Prefer not to say</Label>
        </div>
      </RadioGroup>
    )}
  />

  {errorsStep1.gender && (
    <p className="text-sm text-destructive mt-1">
      {errorsStep1.gender.message}
    </p>
  )}
</div>


                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...registerStep1("dateOfBirth")}
                    className="mt-1 w-fit "
                  />
                  {errorsStep1.dateOfBirth && (
                    <p className="text-sm text-destructive mt-1">{errorsStep1.dateOfBirth.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    {...registerStep1("phoneNumber")}
                    placeholder="080XXXXXXXX"
                    className="mt-1"
                  />
                  {errorsStep1.phoneNumber && (
                    <p className="text-sm text-destructive mt-1">{errorsStep1.phoneNumber.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerStep1("email")}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                  {errorsStep1.email && (
                    <p className="text-sm text-destructive mt-1">{errorsStep1.email.message}</p>
                  )}
                </div>

              </div>

              <Button type="submit" size="lg" className="w-full">
                Next Step <ChevronRight className="ml-2" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitStep2(onStep2Submit)} className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Academic & Conference Details</h2>
                <p className="text-muted-foreground">Step 2 of 2</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="institution">Institution Name *</Label>
                  <Input
                    id="institution"
                    {...registerStep2("institutionName")}
                    placeholder="e.g., FUTA, UNILAG, OAU"
                    className="mt-1"
                  />
                  {errorsStep2.institutionName && (
                    <p className="text-sm text-destructive mt-1">{errorsStep2.institutionName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="faculty">Faculty *</Label>
                  <Input
                    id="faculty"
                    {...registerStep2("faculty")}
                    placeholder="e.g., Engineering"
                    className="mt-1"
                  />
                  {errorsStep2.faculty && (
                    <p className="text-sm text-destructive mt-1">{errorsStep2.faculty.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    {...registerStep2("department")}
                    placeholder="e.g., Electrical Engineering"
                    className="mt-1"
                  />
                  {errorsStep2.department && (
                    <p className="text-sm text-destructive mt-1">{errorsStep2.department.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="level">Level *</Label>
                  <Select onValueChange={(value) => setValueStep2("level", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="100L">100 Level</SelectItem>
                      <SelectItem value="200L">200 Level</SelectItem>
                      <SelectItem value="300L">300 Level</SelectItem>
                      <SelectItem value="400L">400 Level</SelectItem>
                      <SelectItem value="500L">500 Level</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errorsStep2.level && (
                    <p className="text-sm text-destructive mt-1">{errorsStep2.level.message}</p>
                  )}
                </div>

                <div>
                  <Label>How did you hear about #ZTCE2025? *</Label>
                  <RadioGroup
                    onValueChange={(value) => setValueStep2("hearAbout", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Coursemate" id="coursemate" />
                      <Label htmlFor="coursemate">Coursemate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Friend" id="friend" />
                      <Label htmlFor="friend">Friend</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Social Media" id="social" />
                      <Label htmlFor="social">Social Media</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Poster/Flyer" id="poster" />
                      <Label htmlFor="poster">Poster / Flyer</Label>
                    </div>
                  </RadioGroup>
                  {errorsStep2.hearAbout && (
                    <p className="text-sm text-destructive mt-1">{errorsStep2.hearAbout.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="expectations">What are your expectations from the conference?</Label>
                  <Textarea
                    id="expectations"
                    {...registerStep2("expectations")}
                    placeholder="Share your expectations..."
                    className="mt-1 min-h-[100px]"
                  />
                  {errorsStep2.expectations && (
                    <p className="text-sm text-destructive mt-1">{errorsStep2.expectations.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  className="flex-1"
                >
                  <ChevronLeft className="mr-2" /> Previous
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Registration
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Register;
