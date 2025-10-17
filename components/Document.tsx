import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// تنسيق الصفحة والعناصر
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "#e9ecef",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableCol: {
    width: "16.6%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
});

// نوع البيانات
type FetchDataProps =
  | {
      id: number;
      name: string;
      email: string;
      age: number;
      status: boolean;
      country: string;
    }[]
  | [];

// المكون
const MyDocument = ({ data }: { data: FetchDataProps }) => {
  if (!data || data.length === 0) {
    return null
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>User Data Report</Text>

        {/* الجدول */}
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>ID</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Email</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Age</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Status</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Country</Text>
            </View>
          </View>

          {/* Rows */}
          {data.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.age}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {item.status ? "Active" : "Inactive"}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.country}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
