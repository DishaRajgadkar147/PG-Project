import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const OrderDetails = () => {
  const route = useRoute();
  const order = route.params?.order;

  const intervalRef = useRef(null);

  const getDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371000;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const statusFlow = [
    "Order Confirmed",
    "Picked from Store",
    "On the Way",
    "Near You",
    "Delivered",
  ];

  const [statusIndex, setStatusIndex] = useState(0);
  const status = statusFlow[statusIndex];

  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const storeLocation = { latitude: 19.076, longitude: 72.8777 };
  const customerLocation = { latitude: 19.082, longitude: 72.8815 };

  const [partnerLocation, setPartnerLocation] = useState({
    latitude: 19.0785,
    longitude: 72.879,
  });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPartnerLocation((prev) => {
        if (status === "Delivered") {
          clearInterval(intervalRef.current);
          return prev;
        }

        return {
          latitude: prev.latitude + 0.0001,
          longitude: prev.longitude + 0.0001,
        };
      });
    }, 2500);

    return () => clearInterval(intervalRef.current);
  }, [status]);

  useEffect(() => {
    if (statusIndex >= statusFlow.length - 1) return;

    const timer = setTimeout(() => {
      setStatusIndex((prev) => prev + 1);
    }, 6000);

    return () => clearTimeout(timer);
  }, [statusIndex]);

  useEffect(() => {
    if (status === "Delivered") {
      setTimeout(() => setShowRating(true), 800);
    }
  }, [status]);

  const getStatusColor = () => {
    switch (status) {
      case "Order Confirmed":
        return "#2563EB";
      case "Picked from Store":
        return "#7C3AED";
      case "On the Way":
        return "#16A34A";
      case "Near You":
        return "#F59E0B";
      case "Delivered":
        return "#22C55E";
      default:
        return "#6B7280";
    }
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Order not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Order Details</Text>

            <View style={styles.infoBox}>
              <Info label="Order ID" value={order.id} />
              <Info label="Date" value={order.date} />
              <Info
                label="Status"
                value={status}
                valueStyle={{ color: getStatusColor() }}
              />
              <Info label="Total" value={`₹ ${order.total}`} bold />
            </View>

            <View style={styles.partnerCard}>
              <View style={styles.partnerLeft}>
                <View style={styles.partnerAvatar}>
                  <Ionicons name="bicycle" size={20} color="#fff" />
                </View>
                <View>
                  <Text style={styles.partnerName}>Aman</Text>
                  <Text style={styles.partnerSub}>
                    Delivery Partner • Bike
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.statusChip,
                { backgroundColor: `${getStatusColor()}22` },
              ]}
            >
              <Ionicons name="navigate" size={14} color={getStatusColor()} />
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {status}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Live Order Tracking</Text>

            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: storeLocation.latitude,
                  longitude: storeLocation.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Polyline
                  coordinates={[
                    storeLocation,
                    partnerLocation,
                    customerLocation,
                  ]}
                  strokeColor="#16A34A"
                  strokeWidth={4}
                />

                <Marker coordinate={storeLocation} pinColor="green" />
                <Marker coordinate={customerLocation} pinColor="blue" />

                <Marker coordinate={partnerLocation}>
                  <Ionicons
                    name="bicycle"
                    size={28}
                    color={getStatusColor()}
                  />
                </Marker>
              </MapView>
            </View>

            <Text style={styles.sectionTitle}>Items</Text>
          </>
        }
        data={order.items}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name}</Text>
            <Text>x{item.qty}</Text>
            <Text>₹ {item.price * item.qty}</Text>
          </View>
        )}
      />

      <Modal visible={showRating} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Rate your delivery</Text>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                  <Ionicons
                    name={i <= rating ? "star" : "star-outline"}
                    size={32}
                    color="#FACC15"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => setShowRating(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "800" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Info = ({ label, value, bold, valueStyle }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, bold && styles.total, valueStyle]}>
      {value}
    </Text>
  </>
);

export default OrderDetails;


/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FA", padding: 16 },
  header: { fontSize: 24, fontWeight: "900", marginBottom: 16 },
  infoBox: { backgroundColor: "#fff", padding: 16, borderRadius: 18 },
  label: { fontSize: 12, color: "#6B7280", marginTop: 10 },
  value: { fontSize: 14, fontWeight: "600" },
  total: { fontSize: 18, fontWeight: "800" },
  sectionTitle: { fontSize: 18, fontWeight: "800", marginVertical: 10 },
  partnerCard: { backgroundColor: "#fff", padding: 14, borderRadius: 16 },
  partnerLeft: { flexDirection: "row", alignItems: "center" },
  partnerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  partnerName: { fontWeight: "800" },
  partnerSub: { fontSize: 11, color: "#6B7280" },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginBottom: 14,
  },
  statusText: { fontSize: 12, fontWeight: "800", marginLeft: 6 },
  mapContainer: {
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 20,
  },
  map: { flex: 1 },
  itemRow: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "800", marginBottom: 12 },
  starRow: { flexDirection: "row", marginBottom: 16 },
  submitBtn: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
