import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import Button from "~/components/ui/button-component";
import Card from "~/components/ui/card-component";
import { InputField } from "~/components/ui/field-component";
import { useAuth } from "~/hooks/useAuth";

const Login = () => {
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Where ProtectedRoute wanted to send them; fall back to home.
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

    useEffect(() => {
        if (!loading && user) navigate(from, { replace: true });
    }, [loading, user, from, navigate]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            setError('Invalid username or password!');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="h-screen bg-gray-200 flex justify-center items-center">
            <Card className="w-lg">
                <form onSubmit={handleSubmit}>
                    <Card.Body className="p-8 space-y-4">
                        <span className="block text-2xl font-bold">Shoply Admin</span>
                        <span className="block text-sm text-gray-500">Sign in to manage the store.</span>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                        <Button.Submit
                            className="w-full py-2"
                            disabled={submitting}
                        >
                            {submitting ? 'Signing in...' : 'Sign in'}
                        </Button.Submit>
                    </Card.Body>
                </form>
            </Card>
        </div>
    );
};

export default Login;