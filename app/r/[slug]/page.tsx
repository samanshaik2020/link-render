import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
    params: Promise<{ slug: string }>
}

export default async function RotatorPage({ params }: Props) {
    const { slug } = await params
    const headersList = await headers()

    // 1. Get the rotator
    const { data: rotator } = await supabase
        .from('rotators')
        .select('id')
        .eq('slug', slug)
        .single()

    if (!rotator) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Link Not Found</h1>
                    <p className="mt-2 text-gray-600">The rotator link you are looking for does not exist.</p>
                </div>
            </div>
        )
    }

    // 2. Get all URLs for this rotator
    const { data: urls } = await supabase
        .from('rotator_urls')
        .select('id, url')
        .eq('rotator_id', rotator.id)

    if (!urls || urls.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">No Destinations</h1>
                    <p className="mt-2 text-gray-600">This link has no destination URLs configured.</p>
                </div>
            </div>
        )
    }

    // 3. Pick a random URL
    // eslint-disable-next-line
    const randomIndex = Math.floor(Math.random() * urls.length)
    const selectedUrl = urls[randomIndex]

    // 4. Analytics Logging
    const userAgent = headersList.get('user-agent') || 'unknown'
    const referrer = headersList.get('referer') || 'direct'
    const country = headersList.get('x-vercel-ip-country') || 'unknown'

    // Simple device detection
    let deviceType = 'desktop'
    if (/mobile/i.test(userAgent)) {
        deviceType = 'mobile'
    } else if (/tablet|ipad/i.test(userAgent)) {
        deviceType = 'tablet'
    }

    // Fire and forget logging (don't await to speed up redirect)
    supabase.from('rotator_clicks').insert({
        rotator_id: rotator.id,
        url_id: selectedUrl.id,
        country: country,
        device_type: deviceType,
        referrer: referrer
    }).then(({ error }) => {
        if (error) console.error('Analytics error:', error)
    })

    // 5. Redirect
    redirect(selectedUrl.url)
}
