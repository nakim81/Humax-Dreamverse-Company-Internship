import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import './AddressPost.css'

const AddressPost = ({ isOpen, onComplete, onClose }) => {
    return (
        <div className={isOpen ? `addressPostModalStyle` : `addressPostModalStyleNone`}>
            <div style={{ position: 'relative', zIndex: 10000 }}>
                <DaumPostcode
                    onComplete={onComplete}
                    style={{ width: '45%', height: '480px' }}
                />
                <button onClick={onClose} className="addressPostModalCloseBtn">
                    닫기
                </button>
            </div>
        </div>
    );
};

export default AddressPost;