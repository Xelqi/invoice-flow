export default function Sidebar(){
    return(
        <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
            <div className="border-b border-slate-800 p-6">
                <h1 className="text-2x1 font-bold text-white">
                    InvoiceFlow
                </h1>
            </div>
            <nav className="flex-1 sapce-y-2 p-4">
                <a href="/dashboard"
                className="block rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
                Dashboard
                </a>
                <a href="/customers"
                className="block rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
                Customers
                </a>
                <a href="/invoices"
                className="block rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white">
                Invoices
                </a>
            </nav>
        </aside>
    )
}