import React, { useMemo } from 'react';
import Modal from './Modal';
import { useData } from '../../context/DataContext';
import type { Curator } from '../../types';
import { Link } from 'react-router-dom';

interface CuratorDetailModalProps {
  curator: Curator;
  onClose: () => void;
}

const CuratorDetailModal: React.FC<CuratorDetailModalProps> = ({ curator, onClose }) => {
  const { curations } = useData();

  const authoredCurations = useMemo(() => {
    return curations.filter(c => c.authorId === curator.id);
  }, [curator, curations]);

  return (
    <Modal isOpen={true} onClose={onClose} title={curator.name}>
      <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-2">
        {/* Curator Profile Section */}
        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={curator.profileImage}
            alt={curator.name}
            className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-brand-dark flex-shrink-0"
          />
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-serif text-brand-gold">{curator.title}</h2>
            <p className="mt-2 text-gray-300 leading-relaxed">{curator.bio}</p>
          </div>
        </section>

        {/* Authored Curations Section */}
        {authoredCurations.length > 0 && (
          <section>
            <h3 className="text-2xl font-serif font-bold text-center sm:text-left mb-6 border-t border-brand-dark pt-6">작성한 큐레이션</h3>
            <div className="space-y-6">
              {authoredCurations.map((curation) => (
                <div key={curation.id} className="bg-brand-dark p-4 rounded-lg">
                  <h4 className="text-xl font-serif text-brand-gold mb-2">{curation.title}</h4>
                  <p className="text-gray-400 text-sm line-clamp-3">{curation.excerpt}</p>
                  <Link to="/curation" onClick={onClose} className="text-brand-gold text-sm mt-3 hover:underline inline-block">큐레이션 페이지로 &rarr;</Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Modal>
  );
};

export default CuratorDetailModal;