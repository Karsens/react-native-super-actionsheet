import React from "react";
import ActionSheet from "react-native-actionsheet";
import { Keyboard } from "react-native";

/**
 * #todo
 * https://github.com/expo/react-native-action-sheet is probably more intuitive and easy to use. Therefore, I should migrate to this one from now on.
 *
 *
 */
export type Option = {
  index: number;
  title: string;
  destructive?: boolean | undefined;
  cancel?: boolean | undefined;
  onPress?: () => any | void | undefined;
};

type Props = {
  dismissKeyboardWhenDone: boolean;
  data: Option[];
  reference: any;
};

class SuperActionSheet extends React.Component<Props> {
  render() {
    const { data, reference, dismissKeyboardWhenDone } = this.props;

    const otherProps: Props = this.props;
    delete otherProps.data, otherProps.ref;

    const destructive = data && (data.find(o => o.destructive) || {}).index;
    const cancel = data && (data.find(o => o.cancel) || {}).index;
    const titles = data && data.map(o => o.title);

    return titles ? (
      <ActionSheet
        ref={r => reference(r)}
        options={titles}
        cancelButtonIndex={cancel}
        destructiveButtonIndex={destructive}
        onPress={(index: number) => {
          if (dismissKeyboardWhenDone) {
            Keyboard.dismiss();
          }
          if (data[index].onPress) {
            data[index].onPress();
          }
        }}
        {...otherProps}
      />
    ) : null; // <Text>Problem with actionsheet...</Text>;
  }
}

export default SuperActionSheet;
