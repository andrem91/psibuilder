import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Rotas públicas (não requerem autenticação)
    const publicRoutes = ["/", "/login", "/cadastro", "/termos", "/privacidade", "/cookies", "/confirmar-email"];
    const isPublicRoute = publicRoutes.some(
        (route) => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith("/site/")
    );

    // Se não está autenticado e tenta acessar rota protegida
    if (!user && !isPublicRoute && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // Se está autenticado mas email NÃO está confirmado
    if (user && !user.email_confirmed_at && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/confirmar-email";
        return NextResponse.redirect(url);
    }

    // Se está autenticado e email confirmado, e tenta acessar login/cadastro
    if (user && user.email_confirmed_at && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/cadastro")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    // Se está autenticado, email confirmado, e está na página de confirmar-email
    if (user && user.email_confirmed_at && request.nextUrl.pathname === "/confirmar-email") {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

