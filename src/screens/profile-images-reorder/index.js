import OrderImages from "./profile-images-reorder";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

function mapStateToProps(state) {
  return {
    token: state.user.token,
    user: state.user.user,
    deletingImageId: state.user.isDeletingImage,
  };
}

const mapDispatchToProps = {
  deleteImage: UserCreators.requestDeleteImage,
  updateUser: UserCreators.requestUpdateUser,
  updateUserImage: UserCreators.updateUserSuccess,
  reorderImages: UserCreators.requestReorderImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderImages);
