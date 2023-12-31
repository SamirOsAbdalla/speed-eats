import { NextRequest, NextResponse } from "next/server"
import getANearbyRestaurant from "@/util/getRestaurant"
import { FiltersObject } from "@/util/restaurantTypes"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")

    const initialApiToFetch = searchParams.get("initialApiToFetch")
    const cuisineString = searchParams.get("cuisineString")
    const pricesString = searchParams.get("pricesString")
    const filterDistance = searchParams.get("filterDistance")!


    let cuisinesArray: any[] = []
    let pricesArray: any[] = []

    if (cuisineString) {
        cuisinesArray = cuisineString.split(",")
    }
    if (pricesString) {
        pricesArray = pricesString.split(",")
    }

    const apiKeyBundler = {
        yelpKey: process.env.NEXT_PUBLIC_YELP_API_KEY,
        tripAdvisorKey: process.env.NEXT_PUBLIC_TA_API_KEY,
    }

    let coordinates = {
        latitude: 0,
        longitude: 0
    }

    if (latitude && longitude) {
        coordinates = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }
    }

    const filtersObject: FiltersObject = {
        prices: pricesArray,
        cuisines: cuisinesArray,
        filterDistance
    }

    if (!initialApiToFetch) {
        return Response.json("error in search params")
    }

    let response = await getANearbyRestaurant(coordinates, apiKeyBundler, filtersObject, initialApiToFetch)

    return Response.json(response)
}