import { useEffect, useState } from 'react';

const useAuthorization = () => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            setIsAuthorized(false);
            return;
        }

        try {
            const payload: UserPayload = JSON.parse(atob(parts[1]));
            const role = payload.permissions[0].authority;
            setRole(role);
            setIsAuthorized(true);
        } catch (error) {
            console.error('Failed to parse token payload', error);
            setIsAuthorized(false);
        }
    }, []);

    return { isAuthorized, role };
};

export default useAuthorization;

interface Permission {
  authority: string;
}
  
interface UserPayload {
  sub: string;
  permissions: Permission[];
  exp: number;
  iat: number;
}
  