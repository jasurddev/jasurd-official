{/* MODAL ORDER DETAILS */}
      {isModalOpen && (
        <ModalOrderDetails 
          onClose={() => setIsModalOpen(false)} 
          gigTitle={gig.title}
          price={gig.price}
          unit={gig.unit}
        />
      )}