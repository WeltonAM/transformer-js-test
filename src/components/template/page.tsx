import Footer from "../shared/footer";
import Header from "../shared/header/header";

type PageProps = {
    title?: string;
    children: React.ReactNode;
};

export default function Page({ title, children }: PageProps) {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100">
            <Header />

            <main className="flex-1 px-2 py-10 md:px-4">
                {title && (
                    <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">
                        {title}
                    </h1>
                )}

                <div className="max-w-6xl mx-auto">{children}</div>
            </main>

            <Footer />
        </div>
    );
}
