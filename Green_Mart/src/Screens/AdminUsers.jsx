import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import GreenMartTitle from "../Components/GreenMartTitle";
import { myColors } from "../Utils/MyColors";

const users = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        phone: "9876543210",
        status: "Active",
    },
    {
        id: 2,
        name: "Sneha Patil",
        email: "sneha@gmail.com",
        phone: "9123456780",
        status: "Blocked",
    },
    {
        id: 3,
        name: "Amit Verma",
        email: "amit@gmail.com",
        phone: "9988776655",
        status: "Active",
    },
];

const AdminUsers = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.back}>←</Text>
                    </TouchableOpacity>
                    <GreenMartTitle size={26} />
                </View>

                <Text style={styles.pageTitle}>Users</Text>
                <Text style={styles.pageSub}>
                    Registered application users
                </Text>

                {/* USERS LIST */}
                {users.map((user) => (
                    <View key={user.id} style={styles.card}>
                        <View style={styles.rowBetween}>
                            <Text style={styles.name}>{user.name}</Text>

                            <View
                                style={[
                                    styles.statusBadge,
                                    user.status === "Active"
                                        ? styles.active
                                        : styles.blocked,
                                ]}
                            >
                                <Text style={styles.statusText}>
                                    {user.status}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.text}>
                            📧 {user.email}
                        </Text>

                        <Text style={styles.text}>
                            📞 +91 {user.phone}
                        </Text>

                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() =>
                                    navigation.navigate("AdminUserDetails", {
                                        user,
                                    })
                                }
                            >

                                <Text style={styles.actionText}>View</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.actionBtn,
                                    user.status === "Active"
                                        ? styles.blockBtn
                                        : styles.unblockBtn,
                                ]}
                            >
                                <Text style={styles.actionText}>
                                    {user.status === "Active"
                                        ? "Block"
                                        : "Unblock"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AdminUsers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FA",
        padding: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    back: {
        fontSize: 22,
        marginRight: 10,
    },

    pageTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: myColors.third,
    },

    pageSub: {
        fontSize: 13,
        color: "gray",
        marginBottom: 16,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    name: {
        fontSize: 16,
        fontWeight: "800",
        color: myColors.third,
    },

    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#fff",
    },

    active: {
        backgroundColor: "#1DB954",
    },

    blocked: {
        backgroundColor: "#E63946",
    },

    text: {
        marginTop: 8,
        fontSize: 13,
        color: "#555",
    },

    actions: {
        flexDirection: "row",
        marginTop: 14,
    },

    actionBtn: {
        backgroundColor: "#EEF3FF",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 12,
        marginRight: 10,
    },

    actionText: {
        fontWeight: "700",
        color: myColors.primary,
    },

    blockBtn: {
        backgroundColor: "#FFECEC",
    },

    unblockBtn: {
        backgroundColor: "#E8F8F0",
    },
});
