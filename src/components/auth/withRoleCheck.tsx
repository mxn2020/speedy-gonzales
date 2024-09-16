// src/components/auth/withRoleCheck.tsx
import { useRouter } from 'next/router';
import { useRole } from '@/hooks/useRole';

export function withRoleCheck(WrappedComponent: React.ComponentType, requiredRole: string) {
  return function WithRoleCheck(props: any) {
    const { hasRole } = useRole();
    const router = useRouter();

    if (!hasRole(requiredRole)) {
      router.push('/unauthorized');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}