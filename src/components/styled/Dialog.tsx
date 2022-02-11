import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Dialog as DialogDefault, Colors, Constants, PanningProvider, Button, Text } from "react-native-ui-lib";
import { PressableText } from "./PressableText";

interface DialogProps {
  activator?: React.FC<{
    handleOpen: () => void;
  }>;
  height?: number | string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ activator: Activator, height, children }) => {
  const [showDialog, setShowDialog] = useState(false);

  const renderPannableHeader = (props: any) => {
    const { title } = props;
    return (
      <View>
        <View margin-20>
          <Text textBold textTitle>
            {title}
          </Text>
        </View>
        <View height={2} bg-grey70 />
      </View>
    );
  };

  return (
    <>
      <DialogDefault
        useSafeArea
        center={true}
        height={height ? height : "90%"}
        panDirection={PanningProvider.Directions.UP}
        containerStyle={styles.roundedDialog}
        visible={showDialog}
        // onDismiss={this.hideDialog}
        renderPannableHeader={renderPannableHeader}
        pannableHeaderProps={{ title: "Dialog" }}
        ignoreBackgroundPress>
        <View flex>
          <View marginV-20 marginH-20>
            {children}
          </View>
          <View flex bottom>
            <View height={2} bg-grey70 top />
            <View right margin-20>
              <Button text60 label="Close" link onPress={() => setShowDialog(false)} />
            </View>
          </View>
        </View>
      </DialogDefault>
      {Activator ? <Activator handleOpen={() => setShowDialog(true)} /> : <PressableText onPress={() => setShowDialog(true)} text="Open" />}
    </>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: Colors.white,
  },
  roundedDialog: {
    backgroundColor: Colors.white,
    marginBottom: Constants.isIphoneX ? 0 : 20,
    borderRadius: 12,
  },
});

export default Dialog;
