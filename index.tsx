import React from "react";
import ActionSheet from "react-native-actionsheet";
import { Text } from "react-native";

export type Option = {
  index: number;
  title: string;
  destructive?: boolean | undefined;
  cancel?: boolean | undefined;
  onPress?: () => any | void | undefined;
};

type Props = {
  data: Option[];
  reference: any;
};

class SuperActionSheet extends React.Component<Props> {
  render() {
    const { data, reference } = this.props;

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
          if (data[index].onPress) {
            data[index].onPress();
          }
        }}
        {...otherProps}
      />
    ): <Text>Problem with actionsheet...</Text>;
  }
}

export default SuperActionSheet;
