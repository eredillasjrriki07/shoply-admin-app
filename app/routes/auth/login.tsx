import Button from "~/components/ui/button-component";
import Card from "~/components/ui/card-component";
import { InputField } from "~/components/ui/field-component";

const Login = () => {
    return (
        <div className="h-screen bg-gray-200 flex justify-center items-center">
            <Card className="w-lg">
                <Card.Body className="p-8 space-y-4">
                    <span className="block text-2xl font-bold">Shoply Admin</span>
                    <span className="block text-sm text-gray-500">Sign in to manage the store.</span>
                    <InputField label="Email" type="email" />
                    <InputField label="Password" type="password" />
                    <Button.Submit className="w-full py-2">
                        Sign in
                    </Button.Submit>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;