import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface LocationPickerProps {
  onChange: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

const containerStyle = { width: "100%", height: "260px", borderRadius: "0.5rem" };
// Muscat, Oman — sensible default center for this store's delivery area.
const defaultCenter = { lat: 23.588, lng: 58.3829 };

export function LocationPicker({ onChange, initialLat, initialLng }: LocationPickerProps) {
  const { t } = useTranslation();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
    id: "bms-google-maps-script"
  });
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
  );

  const handleClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
      onChange(lat, lng);
    },
    [onChange]
  );

  if (!apiKey || loadError) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 p-3 text-sm text-slate-500">
        {t("checkout.mapUnavailable")}
      </p>
    );
  }

  if (!isLoaded) {
    return <p className="text-sm text-slate-400">{t("checkout.mapLoading")}</p>;
  }

  return (
    <div className="space-y-1">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={marker ?? defaultCenter}
        zoom={marker ? 15 : 11}
        onClick={handleClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
      <p className="text-xs text-slate-500">
        {marker ? t("checkout.mapPinSet") : t("checkout.mapPinHint")}
      </p>
    </div>
  );
}
