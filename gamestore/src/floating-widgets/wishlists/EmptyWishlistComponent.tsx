import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Link from 'next/link';
import {headerPageConfig} from "../../config/pages.config";

export default function EmptyWishlist () {

    return (
        <div className="empty__wishlist">
            <div className="empty__wishlist-container">
                <div className="empty__wishlist-icon">
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: '32px', fill: 'red' }} />
                </div>
                <div className="empty__wishlist-title">
                    <h2>List is empty</h2>
                </div>
                <div className="empty__wishlist-subtitle">
                    <p>You can add items to wishlist by clicking</p>
                </div>
                <div className="empty__wishlist-link">
                    <Link href={`/${headerPageConfig.COLLECTIONS}`} target="_blank">
                        Browse products
                    </Link>
                </div>
            </div>
        </div>
    )
}