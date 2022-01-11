import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../redux/slices/dataApi';

const CmtForm = ({
  idComment,
  idUserComment,
  titleComment,
  timeComment,
  repComment,
}: {
  idComment: number;
  idUserComment: number;
  titleComment: string;
  timeComment: string;
  repComment: Array<object>;
}) => {
  const user = useSelector(state => state.data.dataUser);
  const dispatch = useDispatch();
  return (
    <View style={styles.mv10}>
      <View style={styles.flexRow}>
        <Image
          source={{ uri: user.filter(x => x.id === idUserComment)[0].avatar }}
          style={styles.avaPost123}
        />
        <View>
          <View style={styles.commentBox}>
            <Text style={styles.fontBold}>
              {user.filter(x => x.id === idUserComment)[0].name}
            </Text>
            <Text>{titleComment}</Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.color9c9c9c}>{timeComment}</Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  dataActions.focusReplyUser({
                    idFocusRep: idComment,
                    idUserComment,
                  }),
                );
              }}>
              <Text style={styles.color9c9c9c}>Trả lời</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* replied comment */}
      {repComment.length > 0 ? (
        <FlatList
          data={repComment}
          renderItem={item => {
            return (
              <View style={styles.ml40}>
                <View style={styles.flexRow}>
                  <Image
                    source={{
                      uri: user.filter(
                        x => x.id === item.item.idUserRepComment,
                      )[0].avatar,
                    }}
                    style={styles.avaPost123}
                  />
                  <View>
                    <View style={styles.commentBox}>
                      <Text style={styles.fontBold}>
                        {
                          [...user].filter(
                            x => x.id === item.item.idUserRepComment,
                          )[0].name
                        }
                      </Text>
                      <Text>{item.item.titleRepComment}</Text>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.color9c9c9c}>
                        {item.item.timeRepComment}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(
                            dataActions.focusReplyUser({
                              idFocusRep: idComment,
                              idUserComment,
                            }),
                          );
                        }}>
                        <Text style={styles.color9c9c9c}>Trả lời</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View />
      )}
      {/* end replied comment */}
    </View>
  );
};

export default CmtForm;

const styles = StyleSheet.create({
  fontBold: { fontWeight: 'bold' },
  color9c9c9c: { color: '#9c9c9c', marginRight: 10 },
  flexRow: {
    flexDirection: 'row',
  },
  marginRight: {
    marginRight: 5,
  },
  alignCenter: { alignSelf: 'center', color: 'black' },
  avaPost: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  interactiveBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  stylePost: {
    marginVertical: 8,
    backgroundColor: 'white',
  },
  imgPost: {
    width: '100%',
    height: 300,
    borderColor: '#cecece',
    borderWidth: 1,
  },
  createComment: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputText: {
    backgroundColor: '#dedede',
    width: '85%',
    height: 30,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  iconSend: { width: 30, height: 30 },
  avaPost123: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  commentBox: {
    padding: 5,
    borderRadius: 5,
    margin: 5,
    marginRight: '20%',
    backgroundColor: '#dedede',
  },
  ml40: { marginLeft: 40 },
  mv10: {
    marginVertical: 10,
  },
});
