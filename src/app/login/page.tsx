
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, signupSchema, type LoginFormData, type SignupFormData } from '@/types/auth';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login or Sign Up',
  description: 'Access your MissionView profile or create a new account to join the community.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  const { toast } = useToast();
  const { login, signup, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
    setValue: setSignupValue,
    watch: watchSignup,
    reset: resetSignup,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: 'user',
    }
  });

  useEffect(() => {
    // If user is already authenticated, redirect them to their profile
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  const onLogin = async (data: LoginFormData) => {
    const result = await login(data);
    if (result.success) {
      toast({
        title: 'Login Successful!',
        description: `Welcome back, ${result.user?.username}!`,
      });
      router.push('/profile');
    } else {
      toast({
        variant: "destructive",
        title: 'Login Failed',
        description: result.message,
      });
    }
  };
  
  const onSignup = async (data: SignupFormData) => {
    const result = await signup(data);
    if (result.success && result.user) {
      toast({
        title: 'Account Created!',
        description: `Welcome to MissionView, ${result.user.username}!`,
      });
      router.push('/profile');
    } else {
       toast({
        variant: "destructive",
        title: 'Signup Failed',
        description: result.message || 'An error occurred. Please try again.',
      });
    }
  };

  if (isAuthenticated) {
    return null; // Or a loading spinner while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-150px)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">MissionView Access</CardTitle>
          <CardDescription className="text-center text-lg">
            Login or create an account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="you@example.com"
                    {...registerLogin('email')}
                    className={loginErrors.email ? 'border-destructive' : ''}
                    aria-invalid={loginErrors.email ? "true" : "false"}
                  />
                  {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••"
                    {...registerLogin('password')}
                    className={loginErrors.password ? 'border-destructive' : ''}
                    aria-invalid={loginErrors.password ? "true" : "false"}
                  />
                   {loginErrors.password && <p className="text-sm text-destructive mt-1">{loginErrors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full text-lg py-3" disabled={isLoginSubmitting}>
                  <LogIn className="mr-2 h-5 w-5" /> {isLoginSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input 
                    id="signup-username" 
                    placeholder="AstroExplorer92"
                    {...registerSignup('username')}
                    className={signupErrors.username ? 'border-destructive' : ''}
                  />
                  {signupErrors.username && <p className="text-sm text-destructive mt-1">{signupErrors.username.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="you@example.com"
                    {...registerSignup('email')}
                    className={signupErrors.email ? 'border-destructive' : ''}
                  />
                  {signupErrors.email && <p className="text-sm text-destructive mt-1">{signupErrors.email.message}</p>}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="signup-userType">I am a...</Label>
                  <Select 
                    onValueChange={(value: 'user' | 'scientist' | 'admin') => setSignupValue("userType", value, { shouldValidate: true })}
                    value={watchSignup("userType")}
                  >
                    <SelectTrigger id="signup-userType" className={signupErrors.userType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Space Enthusiast (User)</SelectItem>
                      <SelectItem value="scientist">Scientist / Researcher</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                   {signupErrors.userType && <p className="text-sm text-destructive mt-1">{signupErrors.userType.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="Must be 8+ characters"
                    {...registerSignup('password')}
                    className={signupErrors.password ? 'border-destructive' : ''}
                  />
                   {signupErrors.password && <p className="text-sm text-destructive mt-1">{signupErrors.password.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                  <Input 
                    id="signup-confirmPassword" 
                    type="password" 
                    placeholder="Re-enter your password"
                    {...registerSignup('confirmPassword')}
                    className={signupErrors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {signupErrors.confirmPassword && <p className="text-sm text-destructive mt-1">{signupErrors.confirmPassword.message}</p>}
                </div>
                <Button type="submit" className="w-full text-lg py-3" disabled={isSignupSubmitting}>
                  <UserPlus className="mr-2 h-5 w-5" /> {isSignupSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
