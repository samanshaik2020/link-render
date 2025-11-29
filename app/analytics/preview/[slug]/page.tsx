import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Globe, Smartphone, MousePointer2, Share2 } from 'lucide-react'

type Props = {
    params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

async function getCardAnalytics(slug: string) {
    // 1. Get Card
    const { data: card } = await supabase
        .from('cards')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!card) return null

    // 2. Get Analytics
    const { data: analytics } = await supabase
        .from('analytics')
        .select('*')
        .eq('card_id', card.id)

    return { card, analytics: analytics || [] }
}

export default async function PreviewAnalyticsPage({ params }: Props) {
    const { slug } = await params
    const data = await getCardAnalytics(slug)

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Link Not Found</h1>
                    <Button asChild className="mt-4">
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const { card, analytics } = data

    // Aggregations
    const totalViews = analytics.length

    // Device Breakdown
    const deviceCounts: Record<string, number> = {}
    analytics.forEach(a => {
        // Simple user agent parsing (can be improved)
        const ua = a.user_agent?.toLowerCase() || ''
        let device = 'Desktop'
        if (ua.includes('mobile')) device = 'Mobile'
        else if (ua.includes('tablet') || ua.includes('ipad')) device = 'Tablet'

        deviceCounts[device] = (deviceCounts[device] || 0) + 1
    })
    const topDevices = Object.entries(deviceCounts)
        .sort(([, a], [, b]) => b - a)

    // Top Referrers
    const referrerCounts: Record<string, number> = {}
    analytics.forEach(a => {
        let ref = a.referrer || 'Direct'
        if (ref.startsWith('http')) {
            try {
                ref = new URL(ref).hostname
            } catch { }
        }
        referrerCounts[ref] = (referrerCounts[ref] || 0) + 1
    })
    const topReferrers = Object.entries(referrerCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Share2 className="h-4 w-4" /> {card.title}
                            </p>
                        </div>
                    </div>
                    <Button asChild variant="outline">
                        <Link href={`/p/${slug}`} target="_blank">
                            Visit Link
                        </Link>
                    </Button>
                </div>

                {/* Total Views */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <MousePointer2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalViews}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All time views
                        </p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Device Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Smartphone className="h-5 w-5" />
                                Device Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topDevices.map(([device, count], i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="text-sm">{device}</div>
                                        <div className="font-bold">{count}</div>
                                    </div>
                                ))}
                                {topDevices.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Referrers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Top Referrers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topReferrers.map(([ref, count], i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="truncate max-w-[70%] text-sm" title={ref}>
                                            {ref}
                                        </div>
                                        <div className="font-bold">{count}</div>
                                    </div>
                                ))}
                                {topReferrers.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
