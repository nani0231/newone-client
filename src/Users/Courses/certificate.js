import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Certificate = ({ username, topic, percentage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Certificate of Completion</Text>
        <Text>Name: {username}</Text>
        <Text>Topic: {topic}</Text>
        <Text>Qualification Percentage: {percentage}</Text>
      </View>
    </Page>
  </Document>
);

export default Certificate;
