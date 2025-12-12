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
import { SignUpForm } from "./signup-form";

export const metadata: Metadata = {
    title: "Criar Conta | PsiBuilder",
    description: "Crie sua conta grátis no PsiBuilder e tenha seu site profissional em 5 minutos",
};

export default function CadastroPage() {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle>Crie sua conta grátis</CardTitle>
                <CardDescription>
                    Tenha seu site profissional em 5 minutos
                </CardDescription>
            </CardHeader>

            <CardContent>
                <SignUpForm />
            </CardContent>

            <CardFooter className="justify-center">
                <p className="text-sm text-gray-500">
                    Já tem uma conta?{" "}
                    <Link
                        href="/login"
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Fazer login
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
