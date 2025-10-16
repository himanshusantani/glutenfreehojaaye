import styles from '../../styles/Home.module.css'

function Section2({ section2 }: any) {
    const SectionImages = section2?.[0]?.cms_block_editior?.blocks
    return (
        <>
            <div className={styles.Section2Container}>
                {SectionImages?.map((Image:any, i:any)=>(
                <div key={i} className={styles.Section2Wrapper}>
                    <img src={`${process.env.baseURL}${Image?.data?.file?.url}`} alt="Section2 Images" />
                </div>
                ))}
           
            </div>
        </>
    )
}
export default Section2