"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Compass, CreditCard, Lock, ArrowLeft, Check, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

interface CheckoutFormProps {
  userEmail: string
}

export default function CheckoutForm({ userEmail }: CheckoutFormProps) {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Update user to premium status
      const { error } = await supabase.from("user_test_results").update({ is_premium: true }).eq("user_id", user.id)

      if (error) {
        console.error("Error upgrading to premium:", error)
        alert("Payment successful, but there was an error upgrading your account. Please contact support.")
        return
      }

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Compass className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-serif font-bold text-foreground">Career Compass</h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pricing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Pricing
              </Link>
            </Button>
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground">Upgrade to Premium</h2>
          <p className="text-muted-foreground">Unlock advanced career insights and personalized guidance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-semibold">Career Compass Premium</h3>
                    <p className="text-sm text-muted-foreground">Monthly subscription</p>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">Popular</Badge>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>20+ career recommendations per category</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Detailed AI impact analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Skill development roadmaps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Industry trend analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Personalized career paths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>PDF report downloads</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$29.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$2.32</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>$31.32</span>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg text-sm">
                  <p className="font-medium mb-1">30-Day Money-Back Guarantee</p>
                  <p className="text-muted-foreground">
                    Not satisfied? Get a full refund within 30 days, no questions asked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>Your payment information is secure and encrypted</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Account Information */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={userEmail} disabled className="bg-muted" />
                </div>

                {/* Card Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <Separator />
                <h3 className="font-serif font-semibold">Billing Address</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input
                      id="billingAddress"
                      placeholder="123 Main Street"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg" disabled={processing}>
                  {processing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Complete Payment - $31.32
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy. Your subscription
                  will automatically renew monthly.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
