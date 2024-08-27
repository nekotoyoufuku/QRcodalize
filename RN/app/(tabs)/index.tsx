import { StyleSheet, TouchableOpacity, FlatList, Text } from "react-native";
import { useShareIntent } from "expo-share-intent";
import { uploadQRcodeFile } from "@/repositories/FileSystem/uploadQRcodeFile";

// Components
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { getQRcodeFiles } from "@/repositories/FileSystem/getQRcodeFiles";

type FileType = {
  name: string;
  path: string;
};

export default function HomeScreen() {
  const { hasShareIntent, shareIntent, resetShareIntent, error } =
    useShareIntent();

  const [files, setFiles] = useState<FileType[]>([]);

  useEffect(() => {
    (async () => {
      const _files = await getQRcodeFiles();
      const typedFiles = _files.map(
        (file) =>
          ({
            name: file.name,
            path: file.path,
          }) as FileType
      );

      setFiles(typedFiles);
    })();
  }, []);

  const renderItem = ({ item }: { item: FileType }) => {
    return (
      <TouchableOpacity onPress={() => alert("Item pressed")}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{item.name}</ThemedText>
          <Entypo name="chevron-right" size={24} color="black" />
        </ThemedView>
      </TouchableOpacity>
    );
  };

  async function plusButtonClick() {
    const test = await uploadQRcodeFile({
      name: "cat_file.jpg",
      filepath:
        "/Users/ryotogashi/Library/Developer/CoreSimulator/Devices/AEFA1D5E-67B7-4632-959F-1139860C27E3/data/Media/DCIM/100APPLE/IMG_0001.JPG",
      filetype: "jpg",
    });

    console.log(test);

    alert("Add new item");
  }

  const onGetImages = async () => {
    const _files = await getQRcodeFiles();
    const typedFiles = _files.map(
      (file) =>
        ({
          name: file.name,
          path: file.path,
        }) as FileType
    );

    console.log(typedFiles);

    setFiles(typedFiles);
  };

  return (
    <ThemedView wrapper style={styles.wrapper}>
      {shareIntent?.files ? <Text>{shareIntent.files[0].fileName}</Text> : null}
      <ListHeaderComponent />
      <FlatList data={files} renderItem={renderItem} />
      <TouchableOpacity onPress={plusButtonClick} style={styles.plusIcon}>
        <AntDesign name="pluscircle" size={48} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onGetImages} style={styles.getImageBtn}>
        <AntDesign name="pluscircle" size={48} color="red" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const ListHeaderComponent = () => {
  return (
    <ThemedView style={styles.header}>
      <ThemedText type="title">Home</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderColor: "#ACACAC",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
  },
  plusIcon: {
    position: "absolute",
    bottom: 28,
    right: 40,
  },
  getImageBtn: {
    position: "absolute",
    bottom: 28,
    left: 40,
  },
});
