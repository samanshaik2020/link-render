import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Repeat, BarChart3, Globe, Smartphone, MousePointer2 } from 'lucide-react'

type Props = {
    params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

async function getRotatorAnalytics(slug: string) {
    // 1. Get Rotator
    const { data: rotator } = await supabase
        .from('rotators')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!rotator) return null

    // 2. Get URLs
    const { data: urls } = await supabase
        .from('rotator_urls')
        .select('id, url')
        .eq('rotator_id', rotator.id)

    // 3. Get Clicks
    const { data: clicks } = await supabase
        .from('rotator_clicks')
        .select('*')
        .eq('rotator_id', rotator.id)

    if (!clicks) return { rotator, urls: urls || [], clicks: [] }

    return { rotator, urls: urls || [], clicks }
}

export default async function RotatorAnalyticsPage({ params }: Props) {
    const { slug } = await params
    const data = await getRotatorAnalytics(slug)

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Rotator Not Found</h1>
                    <Button asChild className="mt-4">
                        <Link href="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const { rotator, urls, clicks } = data

    // Aggregations
    const totalClicks = clicks.length

    // Clicks per URL
    const clicksPerUrl = urls.map(url => ({
        url: url.url,
        count: clicks.filter(c => c.url_id === url.id).length
    })).sort((a, b) => b.count - a.count)

    // Top Countries
    const countryCounts: Record<string, number> = {}
    clicks.forEach(c => {
        const country = c.country || 'Unknown'
        countryCounts[country] = (countryCounts[country] || 0) + 1
    })
    const topCountries = Object.entries(countryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)

    // Device Breakdown
    const deviceCounts: Record<string, number> = {}
    clicks.forEach(c => {
        const device = c.device_type || 'Unknown'
        deviceCounts[device] = (deviceCounts[device] || 0) + 1
    })
    const topDevices = Object.entries(deviceCounts)
        .sort(([, a], [, b]) => b - a)

    // Top Referrers
    const referrerCounts: Record<string, number> = {}
    clicks.forEach(c => {
        const ref = c.referrer || 'Direct'
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
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Repeat className="h-4 w-4" /> {rotator.title || 'Untitled Rotator'}
                            </p>
                        </div>
                    </div>
                    <Button asChild variant="outline">
                        <Link href={`/r/${slug}`} target="_blank">
                            Visit Link
                        </Link>
                    </Button>
                </div>

                {/* Total Clicks */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                        <MousePointer2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">{totalClicks}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All time clicks across all destinations
                        </p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Clicks per URL */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Clicks per Destination
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {clicksPerUrl.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="truncate max-w-[70%] text-sm" title={item.url}>
                                            {item.url}
                                        </div>
                                        <div className="font-bold">{item.count}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

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
                                    <div key={i} className="flex items-center justify-between capitalize">
                                        <div className="text-sm">{device}</div>
                                        <div className="font-bold">{count}</div>
                                    </div>
                                ))}
                                {topDevices.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Top Countries */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Top Countries
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topCountries.map(([country, count], i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="text-sm">{country}</div>
                                        <div className="font-bold">{count}</div>
                                    </div>
                                ))}
                                {topCountries.length === 0 && <p className="text-sm text-muted-foreground">No data yet</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Referrers */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MousePointer2 className="h-5 w-5" />
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
