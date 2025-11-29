'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Repeat, Share2, Zap, BarChart3, Globe, ShieldCheck, Link as LinkIcon } from 'lucide-react'
import AuthButton from '@/components/AuthButton'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="relative h-8 w-8 flex items-center justify-center bg-primary/10 rounded-lg text-primary">
              <LinkIcon className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight font-serif">Link Render</span>
          </Link>
          <nav>
            <AuthButton />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-4xl mx-auto space-y-8"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                <Sparkles className="mr-2 h-3 w-3" />
                <span>New: URL Rotators Available</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground">
                Supercharge Your <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Social Media Links
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Create stunning custom previews for your links and optimize traffic with smart URL rotation.
                Boost click-through rates and engagement instantly.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300" asChild>
                  <Link href="/login?next=/dashboard?tab=links">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full border-2 hover:bg-muted/50" asChild>
                  <Link href="#features">
                    Learn More
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-lg text-muted-foreground">
                Powerful tools to manage your links and analyze your audience, all in one dashboard.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Previews</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Control exactly how your links look on Facebook, Twitter, and LinkedIn. Set custom titles, descriptions, and images to maximize clicks.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                  <Repeat className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart URL Rotator</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A/B test your landing pages effortlessly. Create a single link that rotates between multiple destinations to find what converts best.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track every click and view as it happens. Get detailed insights into your audience&apos;s behavior and optimize your strategy.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Domains</h3>
                <p className="text-muted-foreground leading-relaxed">
                  (Coming Soon) Use your own domain name for branded links that build trust and recognition with your audience.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built on enterprise-grade infrastructure. Your links are always up, fast, and secure, ensuring a smooth user experience.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 text-pink-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimized for speed. Our lightweight redirects ensure your users get to their destination without delay.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Three simple steps to better links.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10"></div>

              {/* Step 1 */}
              <div className="text-center space-y-4">
                <div className="h-24 w-24 bg-background border-2 border-primary/20 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10">
                  <span className="text-3xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold">Create</h3>
                <p className="text-muted-foreground">
                  Enter your destination URL and customize your title, description, and image.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4">
                <div className="h-24 w-24 bg-background border-2 border-purple-500/20 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10">
                  <span className="text-3xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-bold">Share</h3>
                <p className="text-muted-foreground">
                  Copy your new short link and share it on any social media platform.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4">
                <div className="h-24 w-24 bg-background border-2 border-blue-500/20 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10">
                  <span className="text-3xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-bold">Analyze</h3>
                <p className="text-muted-foreground">
                  Watch the clicks roll in and track performance in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Join thousands of creators and marketers who are optimizing their links today.
            </p>
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-xl hover:scale-105 transition-transform" asChild>
              <Link href="/login?next=/dashboard">
                Create Your First Link Now
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative h-6 w-6 flex items-center justify-center bg-primary/10 rounded-md text-primary">
                  <LinkIcon className="h-4 w-4" />
                </div>
                <span className="font-bold text-lg font-serif">Link Render</span>
              </Link>
              <p className="text-muted-foreground max-w-xs">
                The ultimate tool for creating beautiful social media previews and smart rotating links.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Link Render. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
