import React from "react";
import ActionSheet from "react-native-actionsheet";

type Option = {
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

class SuperActionSheet<Props> extends React.Component {
  render() {
    const { data, reference }: { data: Option[]; ref: any } = this.props;

    const otherProps = this.props;
    delete otherProps.data, otherProps.ref;

    const destructive = data && (data.find(o => o.destructive) || {}).index;
    const cancel = data && (data.find(o => o.cancel) || {}).index;
    const titles = data && data.map(o => o.title);

    return (
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
    );
  }
}

export default SuperActionSheet;
