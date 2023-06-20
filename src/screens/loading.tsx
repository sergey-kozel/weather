import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from "../colors";
import { observer } from "mobx-react-lite";
import { LoadingService } from "../services/loading.service";

export const LoadingScreen = observer((): JSX.Element => {
  return LoadingService.isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
});

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.Main,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
