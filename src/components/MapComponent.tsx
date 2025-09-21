import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MapComponentProps {
  locations?: Array<{
    lat: number;
    lng: number;
    title: string;
    description?: string;
  }>;
  onLocationSelect?: (lat: number, lng: number) => void;
  height?: string;
}

export const MapComponent = ({ 
  locations = [], 
  onLocationSelect,
  height = "400px" 
}: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isTokenSet, setIsTokenSet] = useState(false);
  const { toast } = useToast();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [77.2090, 28.6139], // Delhi, India
        zoom: 5,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add click handler for location selection
      if (onLocationSelect) {
        map.current.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          onLocationSelect(lat, lng);
          
          // Add marker at clicked location
          new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current!);
        });
      }

      // Add markers for provided locations
      locations.forEach((location) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-semibold">${location.title}</h3>
            ${location.description ? `<p class="text-sm text-gray-600">${location.description}</p>` : ''}
          </div>`
        );

        new mapboxgl.Marker()
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });

      setIsTokenSet(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Invalid Mapbox token or initialization failed",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, locations]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  if (!isTokenSet) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-2 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Mapbox Token Required</p>
                <p className="text-amber-700">
                  Please enter your Mapbox public token to display the map. 
                  Get yours at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTokenSubmit}>
                Load Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Location Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapContainer} 
          className="w-full rounded-lg border border-border overflow-hidden"
          style={{ height }}
        />
        {onLocationSelect && (
          <p className="text-sm text-muted-foreground mt-2">
            Click on the map to select a location
          </p>
        )}
      </CardContent>
    </Card>
  );
};