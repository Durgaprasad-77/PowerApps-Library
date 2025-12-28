export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">System Settings</h1>

            <div className="card p-6 bg-[#0a0a0a] border border-[#262626] rounded-xl space-y-4">
                <h2 className="text-xl font-semibold text-white">Environment</h2>
                <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                        <span className="text-[#a1a1a1]">Node Environment</span>
                        <span className="text-white font-mono text-sm">{process.env.NODE_ENV}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                        <span className="text-[#a1a1a1]">Supabase URL</span>
                        <span className="text-white font-mono text-sm">{process.env.NEXT_PUBLIC_SUPABASE_URL}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
