import Link from "next/link";
import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
    title: "Login | PsicoSites",
    description: "Acesse sua conta no PsicoSites",
};

export default function LoginPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle>Bem-vindo de volta!</CardTitle>
                <CardDescription>
                    Entre na sua conta para acessar o painel
                </CardDescription>
            </CardHeader>

            <CardContent>
                <LoginForm />
            </CardContent>

            <CardFooter className="justify-center">
                <p className="text-sm text-gray-500">
                    Não tem uma conta?{" "}
                    <Link
                        href="/cadastro"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Criar conta grátis
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
