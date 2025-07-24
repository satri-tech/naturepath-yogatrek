"use client"

import Image from "next/image"
import Link from "next/link"
import type { Package } from "@prisma/client"
import { MapPin, Calendar, Star, Heart, Share2, Eye, Clock, Users, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const PackageCard = ({ packages }: { packages: Package }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
      {/* Image Section with Enhanced Overlay */}
      <div className="relative overflow-hidden h-[230px]">
        <Image
          src={packages.image || "/placeholder.svg"}
          alt={packages.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          width={500}
          height={230}
          quality={100}
        />

        {/* Multi-layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


        {/* Best Deal Badge */}
        <Badge
          className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border-0 font-medium px-3 py-1.5"
        >
          <Calendar className="w-3 h-3 mr-1.5 text-white" />
          {packages.Duration}
        </Badge>

      </div>

      <CardContent className="p-4 space-y-2">


        {/* Enhanced Title */}
        <Link href={`/packages/${packages.id}`} className="block">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-all duration-300 leading-tight">
            {packages.title}
          </h3>
        </Link>

        {/* Enhanced Rating Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-colors ${i < 4
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Description */}
        {packages.description && (
          <div className="relative">
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {packages.description.replace(/<[^>]*>/g, "")}
            </p>
          </div>
        )}

      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-4 border-t border-gray-100">
        {/* Enhanced Pricing Section */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Starting from</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {packages.SharingOffer}
              </span>
              {packages.PrivatePrice && (
                <span className="text-lg text-muted-foreground line-through font-medium">
                  {packages.PrivatePrice}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-green-600 font-medium">Save 25%</div>
            <div className="text-xs text-muted-foreground">Limited time</div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3 w-full">

          <Link href={`/packages/${packages.id}`} className="flex-[2]">
            <Button
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
            >
              <span>Book Now</span>
              <div className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight size={16} />
              </div>
            </Button>
          </Link>
        </div>

      </CardFooter>

      {/* Subtle Border Glow on Hover */}
      <div className="absolute inset-0 rounded-lg border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </Card>
  )
}

export default PackageCard