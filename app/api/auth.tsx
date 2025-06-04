import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface WithAuthProps {
  children?: React.ReactNode;
}

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<Omit<P, keyof WithAuthProps>> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const storedsessionId = sessionStorage.getItem("sessionId");
      if (!storedsessionId) {
        router.push("/"); // Redirect to the login page if userId is not found
      }
    }, [router]);

    return <WrappedComponent {...(props as P)} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;