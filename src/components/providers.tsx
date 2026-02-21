"use client";

import { ClerkProvider, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import {Authenticated, Unauthenticated, ConvexReactClient, AuthLoading } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ThemeProvider } from "./theme-provider";
import { UnauthenticatedView } from "./auth/components/unauthenticaed-view";
import { AuthLoadingView } from "@/features/auth/auth-loading-view";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
         <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          >
        </ThemeProvider>
        <Authenticated>
        {children}
        </Authenticated>
        <Unauthenticated>
Not authenticated
          </Unauthenticated>
          <UnauthenticatedView />
          <SignInButton />
          <SignUpButton />
          <AuthLoading> 
            <AuthLoadingView/>
          </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
